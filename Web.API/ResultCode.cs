using FluentValidation.Results;
using Interfaces;
using System;
using System.Linq;

namespace Web.API
{
    public class ApiResultCode
    {
        public ApiResultCode(string code, string message, bool isError = true)
        {
            Code = code;
            IsError = isError;
            Message = message;
        }

        public ApiResultCode(CommandResult result)
        {
            Code = result.Code;
            IsError = !result.IsSuccess;
            OperationId = result.OperationId;
            Message = result.Message;
            Data = result.Data;
        }

        public ApiResultCode(ValidationResult validationResult)
        {
            if (validationResult == null)
                throw new ArgumentNullException(nameof(validationResult));

            ValidationResult = validationResult;
            IsError = !ValidationResult.IsValid;
            Code = "MODEL_NOT_VALID";
            Message =
                $"Поля заполнены неверно:\n{string.Join("\n", validationResult.Errors.Select(v => v.ErrorMessage))}";
        }

        public ValidationResult ValidationResult { get; }

        public string Code { get; }
        public bool IsError { get; }
        public string Message { get; set; }
        public int OperationId { get; set; }
        public object Data { get; set; }
    }
}