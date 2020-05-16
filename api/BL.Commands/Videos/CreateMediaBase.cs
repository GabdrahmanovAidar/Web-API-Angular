using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Videos
{
    public abstract class CreateMediaBase
    {
        private readonly EfContext _db;

        protected CreateMediaBase(EfContext db)
        {
            _db = db;
        }

        protected async Task CreateVideos(List<Upload> model, int id)
        {
            model.ForEach(item =>
            {
                _db.VideosUpload.Add(new DAL.Entities.VideosUpload
                {
                    VideoId = id,
                    VideoUploadId = item.Id
                });
            });
            await _db.SaveChangesAsync();
        }
        protected async Task UpdateVideos(List<Upload> model, int id)
        {
            await CreateVideos(model, id);
        }

        protected async Task DropMedia(int videoId)
        {
            _db.VideosUpload.RemoveRange(_db.VideosUpload.Where(n => n.VideoId == videoId));
            await _db.SaveChangesAsync();
        }
    }
}