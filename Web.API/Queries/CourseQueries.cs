using Interfaces.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Models;

namespace Web.API.Queries
{
    public class CourseQueries : ICourseQueries
    {
        public Task<CourseModel> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<PageResultModel<CourseModel>> GetList(CourseFilter filter)
        {
            throw new NotImplementedException();
        }

    }
}
