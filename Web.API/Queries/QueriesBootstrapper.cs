using DAL;
using Interfaces;
using Interfaces.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace Web.API.Queries
{
    public static class QueriesBootstrapper
    {
        public static void AddQueries(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IUsersQueries, UsersQueries>();
            // serviceCollection.AddTransient<IVideosQueries, VideosQueries>();
            serviceCollection.AddTransient<ICourseQueries, CourseQueries>();
<<<<<<< HEAD
            serviceCollection.AddTransient<ILessonQueries, LessonQueries>();
            
=======
            serviceCollection.AddTransient<IRequestQueries, RequestQueries>();

>>>>>>> 87a655ce16a0650ac17c460e9df15b1c841c7bac
        }
    }
}