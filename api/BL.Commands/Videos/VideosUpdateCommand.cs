using DAL;
using Interfaces;
using Interfaces.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BL.Commands.Videos
{
    public class VideosUpdateCommand : CreateMediaBase, ICommand<VideoUpdateContext>
    {
        private readonly EfContext _db;

        public VideosUpdateCommand(EfContext db) : base(db)
        {
            _db = db;
        }

        public async Task<CommandResult> ExecuteAsync(VideoUpdateContext context)
        {
            var video = await _db.Videos.FirstOrDefaultAsync(x => x.Id == context.Id);
            if (video == null)
            {
                return CommandResult.Fail("NEWS_NOT_FOUND", "Видео не найдено");
            }

            using (var transaction = await _db.Database.BeginTransactionAsync())
            {
                await DeleteCascade(context.Id);

                video.Title = context.VideosItem.Title;
                video.Description = context.VideosItem.Description;
                await _db.SaveChangesAsync();

                await DropMedia(context.Id);
                await CreateVideos(context.Videos, context.Id);

                transaction.Commit();

                return CommandResult.Success();
            }
        }

        private async Task DeleteCascade(int id)
        {
            var cascade = _db.VideosUpload.Where(x => x.VideoId == id).ToList();

            _db.VideosUpload.RemoveRange(cascade);
            await _db.SaveChangesAsync();
        }
    }
}