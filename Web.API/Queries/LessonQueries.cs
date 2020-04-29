using Interfaces.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Models;

namespace Web.API.Queries
{
    public class LessonQueries : ILessonQueries
    {
        public Task<LessonModel> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<LessonModel> GetLessonByCourseId()
        {
            throw new NotImplementedException();
        }

        public Task<PageResultModel<LessonModel>> GetList(LessonFilter filter)
        {
            throw new NotImplementedException();
        }
    }
}
