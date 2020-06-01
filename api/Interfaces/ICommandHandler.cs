using Interfaces.Contexts;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface ICommandHandler
    {
        Task<CommandResult> Execute<T>(T context) where T : IContext;
    }

}
