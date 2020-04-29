using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces
{
    public struct SpecResult
    {
        public SpecResult(bool @true, string code, string message)
        {
            True = @true;
            Code = code;
            Message = message;
        }

        public static SpecResult Yes() => new SpecResult(true, null, null);
        public static SpecResult No(string code, string message) => new SpecResult(false, code, message);

        public bool True { get; }
        public string Code { get; }
        public string Message { get; }

        public static implicit operator bool(SpecResult result)
        {
            return result.True;
        }
    }
}
