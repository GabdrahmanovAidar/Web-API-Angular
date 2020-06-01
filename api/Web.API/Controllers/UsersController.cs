using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using Interfaces.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.API.Models;
//using Web.API.Services;

namespace Web.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ICommandHandler _commandHandler;
        private readonly EfContext _dbContext;
//        private readonly INotificationService _notificationService;
        private readonly IPasswordHasher<Login> _passwordHasher;
        private readonly IUsersQueries _usersQueries;

        public UsersController(ICommandHandler commandHandler,
            IUsersQueries usersQueries,
            IPasswordHasher<Login> passwordHasher,
            EfContext dbContext)
        //    INotificationService notificationService)
        {
            _commandHandler = commandHandler;
            _usersQueries = usersQueries;
            _passwordHasher = passwordHasher;
            _dbContext = dbContext;
         //   _notificationService = notificationService;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = Login.Types.SystemAdministrator)]
        [ProducesResponseType(typeof(UserModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id, int time_offset = 0)
        {
            var user = await _usersQueries.GetById(id);
            if (user == null) return BadRequest(new ApiResultCode("USER_NOT_FOUND", "Пользователь не найден"));

            user.SetOffset(time_offset);
            return Ok(user);
        }

        [HttpGet("token")]
        [ProducesResponseType(typeof(UserModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            var user = await _usersQueries.GetByToken();
            if (user == null) return BadRequest(new ApiResultCode("USER_NOT_FOUND", "Пользователь не найден"));
            return Ok(user);
        }

        [HttpGet("")]
        [Authorize(Roles = Login.Types.SystemAdministrator)]
        [ProducesResponseType(typeof(List<UserModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetList(
            int page = 1,
            int size = 1000,
            int time_offset = 0,
            string user_name = null,
            string type = null
        )
        {
            var result = await _usersQueries.GetList(new UsersFilter
            {
                Page = page,
                Size = size,
                Type = type,
                UserName = user_name
            });
            result.List.ForEach(x => x.SetOffset(time_offset));
            return Ok(result);
        }

        [HttpPost("")]
        [ProducesResponseType(typeof(UserModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] UserModel model, int time_offset = 0)
        {
            model.SetOffset(-1 * time_offset);
            var userEmail = string.IsNullOrEmpty(model.Email) ? model.Username : model.Email;
            if (_dbContext.Users.Any(x => x.Email.ToUpper() == userEmail))
                return BadRequest(new ApiResultCode("USER_EXISTS", "Пользователь существует"));

            if (string.IsNullOrWhiteSpace(model.Password))
                return BadRequest(new ApiResultCode("PASSWORD_EMPTY", "Укажите пароль"));

            var login = GetLogin(model);
            login.Type = Login.Types.User;
            login.Hash = _passwordHasher.HashPassword(login, model.Password);

            var user = GetUser(model);


            var commandResult = await _commandHandler.Execute(new UserCreateContext
            {
                User = user,
                Password = model.Password,
                Login = login
            });

            if (!commandResult.IsSuccess) return BadRequest(new ApiResultCode(commandResult));
            var token = $"{Guid.NewGuid()}";
            user.OperationsToken = token;
            _dbContext.SaveChanges();
          //  await _notificationService.SendConfirmationLinkAsync(user.Email, user.Id.ToString(), token);
            var userModel = await _usersQueries.GetById(user.Id);
            userModel.SetOffset(time_offset);

            return Ok(userModel);

        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(UserModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] UserModel model, int time_offset = 0)
        {
            model.SetOffset(-1 * time_offset);

            var user = GetUser(model);
            var login = GetLogin(model);
            var commandResult = await _commandHandler.Execute(new UserUpdateContext
            {
                User = user,
                Id = id,
                Type = model.Type
            });

            if (commandResult.IsSuccess)
            {
                var userModel = await _usersQueries.GetById(id);
                userModel.SetOffset(time_offset);
                var token = $"code={Guid.NewGuid()}&date={DateTime.UtcNow}";
                var userDbModel = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userModel.Id);
                userDbModel.EmailConfirmed = false;
                userDbModel.OperationsToken = token;
                await _dbContext.SaveChangesAsync();
            //    await _notificationService.SendConfirmationLinkAsync(userDbModel.Email, userDbModel.Id.ToString(),
//                    token);
                return Ok(userModel);
            }

            return BadRequest(new ApiResultCode(commandResult));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _commandHandler.Execute(new UserDeleteContext
            {
                Id = id
            });
            return result.IsSuccess ? (IActionResult) Ok() : BadRequest(new ApiResultCode(result));
        }

        private User GetUser(UserModel model)
        {
            return new User
            {
                Status = model.Status?.Trim(),
                PatronymicName = model.PatronymicName?.Trim(),
                FirstName = model.FirstName?.Trim(),
                LastName = model.LastName?.Trim(),
                Phone = model.Phone?.Trim(),
                PhotoUploadId = null,
                BirthDate = model.BirthDate,
                CreatedDate = DateTime.UtcNow,
                UserName = model.Email
            };
        }


        private Login GetLogin(UserModel userModel)
        {
            var login = new Login
            {
                UserName = userModel.Email.Trim(),
                Type = Login.Types.User
            };
            if (!string.IsNullOrWhiteSpace(userModel.Password))
                login.Hash = _passwordHasher.HashPassword(login, userModel.Password);

            return login;
        }
    }
}