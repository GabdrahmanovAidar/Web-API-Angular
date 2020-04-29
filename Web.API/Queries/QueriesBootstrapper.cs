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
            serviceCollection.AddTransient<IRequestQueries, RequestQueries>();

        }
    }
}