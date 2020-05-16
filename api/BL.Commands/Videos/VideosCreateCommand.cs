using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Videos
{
    public class VideosCreateCommand : CreateMediaBase, ICommand<VideoCreateContext>
    {
        private readonly EfContext _db;

        public VideosCreateCommand(EfContext db) : base(db)
        {
            _db = db;
        }

        public async Task<CommandResult> ExecuteAsync(VideoCreateContext context)
        {
            using (var transaction = await _db.Database.BeginTransactionAsync())
            {
                context.Video.Status = DAL.Entities.VideosItem.Statuses.Active;
                context.Video.CreatedDate = DateTime.UtcNow;

                _db.Videos.Add(context.Video);
                await _db.SaveChangesAsync();


                await CreateVideos(context.Videos, context.Video.Id);

                transaction.Commit();
            }

            return CommandResult.Success();
        }
    }
}