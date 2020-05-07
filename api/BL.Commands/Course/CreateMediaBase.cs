using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Course
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
                _db.CourseUploads.Add(new DAL.Entities.CourseUpload
                {
                    CourseId = id,
                    PhotoUploadId = item.Id
                });
            });
            await _db.SaveChangesAsync();
        }

        protected async Task UpdateUploads(List<Upload> model, int id)
        {
            await CreateUploads(model, id);
        }

        protected async Task DropMedia(int courseId)
        {
            _db.CourseUploads.RemoveRange(_db.CourseUploads.Where(n => n.CourseId == courseId));
            await _db.SaveChangesAsync();
        }
    }
}
