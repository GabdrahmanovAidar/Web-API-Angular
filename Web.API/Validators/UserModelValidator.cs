using FluentValidation;
using Web.API.Models;

namespace Web.API.Validations
{
    public class UserModelValidator : AbstractValidator<UserModel>
    {
        public UserModelValidator()
        {
            RuleFor(x => x.FirstName)
                .MaximumLength(100)
                .WithMessage("Имя до 100 символов")
                .NotEmpty()
                .WithMessage("Имя обязательно");

            RuleFor(x => x.LastName)
                .MaximumLength(100)
                .WithMessage("Фамилия до 100 символов")
                .NotEmpty()
                .WithMessage("Фамилия обязательна");


            RuleFor(x => x.PatronymicName)
                .MaximumLength(100)
                .WithMessage("Отчество до 100 символов");

            RuleFor(x => x.Email).EmailAddress().WithMessage("UserName некорректен");

            RuleFor(x => x.Phone).MaximumLength(20)
                .WithMessage("Номер телефона до 20 символов")
                .NotEmpty()
                .WithMessage("Номер телефона обязателен");
        }
    }
}