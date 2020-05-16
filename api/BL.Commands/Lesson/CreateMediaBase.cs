using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Lesson
{
    public abstract class CreateMediaBase
    {
        private readonly EfContext _db;

        protected CreateMediaBase(EfContext db)
        {
            _db = db;
        }

        protected async Task CreateUploads(List<Upload> model, int id)
        {
            model.ForEach(item =>
            {
                _db.LessonUploads.Add(new DAL.Entities.LessonUploads
                {
                    LessonId = id,
                    
                });
            });
            await _db.SaveChangesAsync();
        }

        protected async Task CreateVideos(List<Upload> model, int id)
        {
            model.ForEach(item =>
            {
                _db.LessonUploads.Add(new DAL.Entities.LessonUploads
                {
                    LessonId = id,
                    VideoUploadId = item.Id
                });
            });
            await _db.SaveChangesAsync();
        }

        protected async Task UpdateUploads(List<Upload> model, int id)
        {
            await CreateUploads(model, id);
        }

        protected async Task UpdateVideos(List<Upload> model, int id)
        {
            await CreateVideos(model, id);
        }

        protected async Task DropMedia(int lessonId)
        {
            _db.LessonUploads.RemoveRange(_db.LessonUploads.Where(n => n.LessonId == lessonId));
            await _db.SaveChangesAsync();
        }
    }
}