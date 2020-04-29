
using System.Threading.Tasks;

namespace Interfaces
{
    public interface ISmsSender
    {
        Task<CommandResult> Send(string phone, string message);
    }
}
