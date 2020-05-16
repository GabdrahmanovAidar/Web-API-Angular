using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Videos
{
    public class VideosDeleteCommand : ICommand<VideoDeleteContext>
    {
        private readonly EfContext _db;
        private readonly ICurrentUser _currentUser;

        public VideosDeleteCommand(EfContext db, ICurrentUser currentUser)
        {
            _db = db;
            _currentUser = currentUser;
        }

        public async Task<CommandResult> ExecuteAsync(VideoDeleteContext context)
        {
            var videos = _db.Videos.FirstOrDefault(x => x.Id == context.Id);
            if (videos == null)
            {
                return CommandResult.Fail("NEWS_NOT_FOUND", "Видео не найдено");
            }

            videos.Status = DAL.Entities.VideosItem.Statuses.Deleted;
            await _db.SaveChangesAsync();
            return CommandResult.Success();
        }
    }
}