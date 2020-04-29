using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.Specs
{
    public interface IUserSpecs
    {
        Task<SpecResult> IsUserCodeCorrect(CleanPhone phone, string code);
        Task<SpecResult> IsUserEmailUnique(string email);
        Task<SpecResult> IsUserPhoneUnique(CleanPhone phone);

    }
}
