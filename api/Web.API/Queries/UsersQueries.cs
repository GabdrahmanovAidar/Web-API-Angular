using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Queries;
using Microsoft.EntityFrameworkCore;
using Web.API.Models;

namespace Web.API.Queries
{
    public class UsersQueries : IUsersQueries
    {
        private readonly ICurrentUser _currentUser;
        private readonly EfContext _db;

        public UsersQueries(EfContext db, ICurrentUser currentUser)
        {
            _db = db;
            _currentUser = currentUser;
        }

        public Task<UserModel> GetByToken()
        {
            var login = _currentUser.GetAuthUsr();
            var query = _db.Users.AsQueryable().Where(x => x.Id == login.Id);
            return MapQuery(query).FirstOrDefaultAsync();
        }

        //Получение id
        public async Task<UserModel> GetById(int id)
        {
            var query = _db.Users.AsQueryable().Where(x => x.Id == id);

            return await MapQuery(query).FirstOrDefaultAsync();
        }

        public async Task<UserModel> GetByUsername(string username)
        {
            return await MapQuery(_db.Users.Where(x => x.UserName == username)).FirstOrDefaultAsync();
        }

        public async Task<PageResultModel<UserModel>> GetList(UsersFilter filter)
        {
            var query = _db.Users.AsQueryable();

            if (filter.Type != null)
                query = query.Where(x =>
                    x.LoginId.HasValue && x.LoginId.Value == _db.Logins.FirstOrDefault(y => y.Type == filter.Type).Id);

            if (filter.UserName != null) query = query.Where(x => x.UserName == filter.UserName);

            var count = await query.CountAsync();

            query = query.OrderByDescending(x => x.Id)
                .Skip((filter.Page - 1) * filter.Size)
                .Take(filter.Size);

            var list = await MapQuery(query).ToListAsync();

            return new PageResultModel<UserModel>
            {
                Size = filter.Size,
                Page = filter.Page,
                TotalCount = count,
                List = list
            };
        }

        private IQueryable<UserModel> MapQuery(IQueryable<User> query)
        {
            return query.Select(x => new UserModel
            {
                Id = x.Id,
                CreatedDate = x.CreatedDate,
                Status = x.Status,
                LastName = x.LastName,
                PatronymicName = x.PatronymicName,
                FirstName = x.FirstName,
                Email = x.UserName,
                Username = x.UserName,
                Phone = x.Phone,
                BirthDate = x.BirthDate,
                Type = _db.Logins.FirstOrDefault(y => y.Id == x.LoginId).Type,
                PhotoUpload = _db.Uploads.Where(u => u.Id == x.PhotoUploadId)
                    .Select(u => new PhotoUploadModel
                    {
                        Id = u.Id,
                        SizeInBytes = u.SizeInBytes,
                        Extension = u.Extension,
                        Width = u.Width,
                        Height = u.Height
                    })
                    .FirstOrDefault()
            });
        }
    }
}