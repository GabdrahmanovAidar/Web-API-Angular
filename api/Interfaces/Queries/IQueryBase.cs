using System.Threading.Tasks;
using Web.API.Models;

namespace Interfaces.Queries
{
    public interface IQueryBase<T, TFilter>
    {
        Task<PageResultModel<T>> GetList(TFilter filter);

        Task<T> GetById(int id);
    }
}