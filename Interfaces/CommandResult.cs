namespace Interfaces
{
    public struct CommandResult
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public int OperationId { get; set; }
        public object Data { get; set; }

        public static CommandResult Success() { return new CommandResult { IsSuccess = true }; }
        public static CommandResult Fail(string code, string message)
        {
            return new CommandResult()
            {
                IsSuccess = false,
                Code = code,
                Message = message
            };
        }

        public static CommandResult FromSpec(SpecResult specResult)
        {
            return new CommandResult
            {
                Code = specResult.Code,
                IsSuccess = specResult.True,
                Message = specResult.Message,
            };
        }

        public static CommandResult NoPermissions()
        {
            return Fail("NO_PERMISSIONS", "Нет прав");
        }
    }
}
