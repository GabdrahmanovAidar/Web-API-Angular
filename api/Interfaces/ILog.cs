using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface ILog<T>
    {
        void Critical(Exception                 e,
                      string                    message          = null,
                      [CallerMemberName] string memberName       = "",
                      [CallerFilePath]   string sourceFilePath   = "",
                      [CallerLineNumber] int    sourceLineNumber = 0
        );

        void Error(string                    message,
                   [CallerMemberName] string memberName       = "",
                   [CallerFilePath]   string sourceFilePath   = "",
                   [CallerLineNumber] int    sourceLineNumber = 0

        );
        void Info(string                    message,
                  [CallerMemberName] string memberName       = "",
                  [CallerFilePath]   string sourceFilePath   = "",
                  [CallerLineNumber] int    sourceLineNumber = 0
        );

        Task FlushAsync();
    }
}