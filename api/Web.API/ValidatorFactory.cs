using System;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Web
{
    public class ValidatorFactory : IValidatorFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public ValidatorFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;

            ValidatorOptions.PropertyNameResolver = SnakeCasePropertyResolver.ResolvePropertyName;
        }

        public IValidator<T> GetValidator<T>()
        {
            return _serviceProvider.GetService<IValidator<T>>();
        }

        public IValidator GetValidator(Type type)
        {
            var validatorType = typeof(IValidator<>).MakeGenericType(type);
            return (IValidator) _serviceProvider.GetService(validatorType);
        }
    }
}