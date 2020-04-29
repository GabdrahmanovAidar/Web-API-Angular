using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces.Specs
{
    public interface ISmsCodeSpecs
    {
        Task<SpecResult> IsIpAvailableToSend(string ipAddress);

        Task<SpecResult> IsPhoneAvailableToSend(CleanPhone phone);

        Task<SpecResult> IsSmsCodeValid(CleanPhone phone, string code);
    }
}
