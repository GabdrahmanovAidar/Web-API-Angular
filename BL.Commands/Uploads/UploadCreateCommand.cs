using System;
using System.Threading.Tasks;
using DAL;
using Interfaces;
using Interfaces.Contexts;

namespace BL.Commands
{
    public class UploadCreateCommand : ICommand<UploadCreateContext>
    {
        private readonly EfContext _context;

        public UploadCreateCommand(EfContext context)
        {
            _context = context;
        }

        public async Task<CommandResult> ExecuteAsync(UploadCreateContext context)
        {
            var model = context.Upload;
            model.CreatedDate = DateTime.UtcNow;

            _context.Uploads.Add(model);
            await _context.SaveChangesAsync();

            return CommandResult.Success();
        }
    }
}