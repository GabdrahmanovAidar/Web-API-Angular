//using DAL;
//using DAL.Entities;
//using Interfaces.Queries;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Web.API.Models;

//namespace Web.API.Queries
//{
//    public class VideosQueries : IVideosQueries
//    {
//        private readonly EfContext _db;

//        public VideosQueries(EfContext db)
//        {
//            _db = db;
//        }

//        public Task<VideoModel> GetById(int id)
//        {
//            var query = _db.Videos.AsQueryable().Where(x => x.Id == id);
//            return MapQuery(query).FirstOrDefaultAsync();
//        }

//        public async Task<PageResultModel<VideoModel>> GetList(VideoFilter filter)
//        {
//            var query = _db.Videos.AsQueryable();

//            if (filter.Status != null)
//            {
//                query = query.Where(x => x.Status == filter.Status);
//            }

//            var count = await query.CountAsync();
//            query = query.OrderByDescending(x => x.Id);

//            var list = await MapQuery(query)
//                .Skip((filter.Page - 1) * filter.Size)
//                .Take(filter.Size).ToListAsync();

//            return new PageResultModel<VideoModel>
//            {
//                Size = filter.Size,
//                Page = filter.Page,
//                TotalCount = count,
//                List = list
//            };
//        }

//        //private IQueryable<VideoModel> MapQuery(IQueryable<VideosItem> query) =>
//        //    query.Select(x => new VideoModel
//        //    {
//        //        Id = x.Id,
//        //        Description = x.Description,
//        //        Title = x.Title,
//        //        Status = x.Status,
//        //        CreatedDate = x.CreatedDate,
//        //        Videos = _db
//        //            .VideosUpload
//        //            .Where(q => q.VideoId == x.Id)
//        //            .Join(_db.Uploads, q => q.VideoUploadId, u => u.Id, (q, u) => new VideoUploadModel
//        //            {
//        //                Extension = u.Extension,
//        //                Height = u.Height,
//        //                Id = u.Id,
//        //                SizeInBytes = u.SizeInBytes,
//        //                Width = u.Width,
//        //                Duration = u.Duration,
//        //                ContentType = u.ContentType
//        //            })
//        //            .ToList()
//        //    });
//    }
//}