using System.Threading.Tasks;
using Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace BL.Commands
{
    public class CommandHandler : ICommandHandler
    {
        private readonly IServiceProvider _serviceProvider;

        public CommandHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task<CommandResult> Execute<T>(T context) where T : IContext
        {
            var command = _serviceProvider.GetRequiredService<ICommand<T>>();

            try
            {
                return await command.ExecuteAsync(context);
            }
            catch (Exception e)
            {
                return new CommandResult
                {
                    Code = "INVALID_OPERATION",
                    IsSuccess = false,
                    Message = "Неизвестная ошибка:" + e.Message,
                    Data = e
                };
            }
        }
    }
}