using DAL;
using DAL.Entities;
using Interfaces.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Models;

namespace Web.API.Queries
{
    public class CourseQueries : ICourseQueries
    {
        private readonly EfContext _db;
        private IMemoryCache cache;

        public CourseQueries(EfContext db)
        {
            _db = db;
        }
        public async Task<CourseModel> GetById(int id)
        {
            IQueryable<Course> course = null;
            if (!cache.TryGetValue(id, out course))
            {
                course =  _db.Courses.AsQueryable().Where(p => p.Id == id);
                if (course != null)
                {
                    cache.Set(course.FirstOrDefault().Id, course.FirstOrDefault(),
                        new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));
                }
            }
            course.AsQueryable();
                
            return await MapQuery(course).FirstOrDefaultAsync();

        }

        public async Task<PageResultModel<CourseModel>> GetList(CourseFilter filter)
        {
            var query = _db.Courses.AsQueryable();
            if (filter.Status != null)
            {
                query = query.Where(x => x.Status == filter.Status);
            }
            if (filter.Level != null)
            {
                query = query.Where(x => x.Level == filter.Level);
            }
            query = query.OrderByDescending(x => x.Id)
                .Skip((filter.Page - 1) * filter.Size)
                .Take(filter.Size);

            var count = await query.CountAsync();

            var list = await MapQuery(query).ToListAsync();

            return new PageResultModel<CourseModel>
            {
                Size = filter.Size,
                Page = filter.Page,
                TotalCount = count,
                List = list
            };
        }
        private IQueryable<CourseModel> MapQuery(IQueryable<Course> query)
        {
            return query.Select(x => new CourseModel
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                CourseDuration = x.CourseDuration,
                Level = x.Level,
                Status = x.Status,
                Covers = _db.Uploads.Where(upload =>
                _db.CourseUploads.Any(coursesUpload =>
                            coursesUpload.PhotoUploadId == upload.Id && coursesUpload.CourseId == x.Id))
                    .Select(p => new PhotoUploadModel
                    {
                        Extension = p.Extension,
                        Height = p.Height,
                        Id = p.Id,
                        SizeInBytes = p.SizeInBytes,
                        Width = p.Width
                    }).ToList()                
            }); ;
        }

    }
}
