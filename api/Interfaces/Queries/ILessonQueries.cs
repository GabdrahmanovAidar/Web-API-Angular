using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.API.Models;

namespace Interfaces.Queries
{
    public interface ILessonQueries : IQueryBase<LessonModel, LessonFilter>
    {
        Task<LessonModel> GetLessonByCourseId(int courseId);
    }
}
