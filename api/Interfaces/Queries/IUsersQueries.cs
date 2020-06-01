using DAL.Entities;
using System.Threading.Tasks;
using Web.API.Models;

namespace Interfaces.Queries
{
    public interface IUsersQueries : IQueryBase<UserModel, UsersFilter>
    {
        Task<UserModel> GetByUsername(string username);
        Task<UserModel> GetByToken();
    }
}