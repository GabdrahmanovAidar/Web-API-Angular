using BL.Commands.Users.Specs;
using Interfaces;
using Interfaces.Specs;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;

namespace BL.Commands
{
    public static class Bootstrapper
    {
        public static IServiceCollection AddCommands(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<ICommandHandler, CommandHandler>();
            serviceCollection.AddGenericTypes(typeof(ICommand<>), "BL.Commands", "Interfaces");
            serviceCollection.AddTransient<IUserSpecs, UserSpecs>();
            return serviceCollection;
        }

        public static void AddGenericTypes(this IServiceCollection services, Type genericInterface,
            params string[] assemblies)
        {
            var classes = assemblies.Select(Assembly.Load).SelectMany(x => x.GetTypes())
                .Where(x => x.IsClass && !x.IsAbstract)
                .Where(
                    x => x.GetInterfaces()
                        .Any(p => p.IsGenericType && p.GetGenericTypeDefinition() == genericInterface));

            foreach (var @class in classes)
            {
                var interf = @class.GetInterfaces()
                    .First(x => x.IsGenericType && x.GetGenericTypeDefinition() == genericInterface);

                services.AddTransient(interf, @class);
            }
        }
    }
}