using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.API.Extensions;
using Web.API.Models;
using System.Net.Cache;
using Microsoft.Extensions.Caching.Memory;

namespace Web.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProfileController : ControllerBase
    {
        private readonly EfContext _dbContext;
        private readonly ICommandHandler _commandHandler;
        private readonly IStorageProvider _storageProvider;
        private readonly ICurrentOperation _currentOperation;
        private readonly IFileMetadataReader _fileMetadataReader;
        private readonly IMemoryCache _cache;

        public ProfileController(
            EfContext dbContext,
            ICommandHandler commandHandler,
            IStorageProvider storageProvider,
            ICurrentOperation currentOperation,
            IFileMetadataReader fileMetadataReader,
            IMemoryCache memoryCache)
        {
            _dbContext = dbContext;
            _commandHandler = commandHandler;
            _storageProvider = storageProvider;
            _currentOperation = currentOperation;
            _fileMetadataReader = fileMetadataReader;
            _cache = memoryCache;
        }

        [HttpPost]
        public async Task<IActionResult> UpdatePhoto(IFormFile image)
        {
            var userId = HttpContext.GetUserId();
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null || userId == 0)
            {
                return Unauthorized();
            }

            int limitSize = User.Identity.IsAuthenticated ? 100 : 15;

            var size = image.Length;
            if (size > limitSize * 1000 * 1000 || size == 0)
            {
                return BadRequest(new ApiResultCode("INVALID_SIZE", $"Supports less {limitSize} MB", true)
                {
                    OperationId = _currentOperation.GetCurrentOperationId()
                });
            }

            var stream = image.OpenReadStream();
            stream.Position = 0;

            var memoryStream = new MemoryStream();
            await stream.CopyToAsync(memoryStream);

            var bytes = memoryStream.ToArray();

            var uploadEntity = new Upload
            {
                Id = Guid.NewGuid().ToString(),
                Extension = System.IO.Path.GetExtension(image.FileName),
                SizeInBytes = (int)size,
                ContentType = image.ContentType
            };
            var photoMedia = _fileMetadataReader.GetPhotoMetaData(bytes, image.FileName);
            if (photoMedia != null)
            {
                uploadEntity.Width = photoMedia.Width;
                uploadEntity.Height = photoMedia.Height;
                uploadEntity.Type = Upload.Types.Photo;
            }
            memoryStream.Position = 0;
            await _storageProvider.UploadAsync(memoryStream, $"{uploadEntity.Id}{uploadEntity.Extension}");

            var context = new UploadCreateContext
            {
                Upload = uploadEntity
            };

            var result = await _commandHandler.Execute(context);
            if (result.IsSuccess)
            {
                var model = new PhotoUploadModel
                {
                    Id = context.Upload.Id.ToString(),
                    SizeInBytes = context.Upload.SizeInBytes,
                    Extension = context.Upload.Extension,
                    Width = context.Upload.Width,
                    Height = context.Upload.Height
                };
                user.PhotoUploadId = model.Id;
                await _dbContext.SaveChangesAsync();
                return Ok(model);
            }
            return BadRequest();
        }
        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] UserModel model)
        {
            

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == HttpContext.GetUserId());
            

            if (user.Phone == model.Phone)
            {
                return Ok();
            }
            if ( _cache.Get(user.Id) != null)
            {
                if (int.Parse(_cache.Get(user.Id).ToString()) >= 1)
                {
                    var ercode = 0;
                    string error = "ERROR_LIMITED_REQUEST";
                    return Ok(ercode);
                }
                int count = int.Parse(_cache.Get(user.Id).ToString()) + 1;
                _cache.Set(user.Id, count, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(2)//1440
                });
                
                Random rnd = new Random();
                var code = rnd.Next(1000, 9999);
                SMSC sms = new SMSC();
                string[] r = sms.send_sms(model.Phone, user.FirstName + ",ваш код на замену номера: " + code, 0,0, "", 0, 0, "maxsms=3");
                return Ok(code);
            }
            else
            {
                int count = 0; 
                Random rnd = new Random();
                var code = rnd.Next(1000, 9999);
                SMSC sms = new SMSC();
                //string[] r = sms.send_sms(model.Phone, user.FirstName + ",ваш код на замену номера: " + code, 0, "", 0, 0, "", "maxsms=3");
                _cache.Set(user.Id, count, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(2)//1440
                });
               
                var cashCode = _cache.Get(user.Id);
                return Ok(code);
            }
        }
        [HttpPut]
        public async Task<IActionResult> PatchNumber([FromBody] UserModel model)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == HttpContext.GetUserId());
            if (user == null)
            {
                return Unauthorized();
            }
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PatronymicName = model.PatronymicName;
            user.Phone = model.Phone;
            user.BirthDate = model.BirthDate;
            _dbContext.SaveChanges();
            return Ok();
        }
    

        [HttpGet]
        public async Task<IActionResult> Profile()
        {
            var userId = HttpContext.GetUserId();
            if (userId == 0)
            {
                return Unauthorized();
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            return Ok
            (
                new UserModel
                {
                    Id = user.Id,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    Status = user.Status,
                    Phone = user. Phone,
                    BirthDate = user.BirthDate,
                    Email = user.UserName,
                    PatronymicName = user.PatronymicName,
                    
                    IsEmailConfirmed = user.EmailConfirmed,
                    PhotoUpload = _dbContext.Uploads.Where(x => x.Id == user.PhotoUploadId).Select(x => new PhotoUploadModel
                    {
                        Id = x.Id.ToString(),
                        SizeInBytes = x.SizeInBytes,
                        Extension = x.Extension,
                        Width = x.Width,
                        Height = x.Height,
                    })
                    .FirstOrDefault()
                }
            );
        }

    }
}