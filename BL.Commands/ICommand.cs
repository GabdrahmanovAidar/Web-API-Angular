using Interfaces;
using System.Threading.Tasks;

namespace BL.Commands
{
    public interface ICommand<T> where T : IContext
    {
        Task<CommandResult> ExecuteAsync(T context);
    }
}
