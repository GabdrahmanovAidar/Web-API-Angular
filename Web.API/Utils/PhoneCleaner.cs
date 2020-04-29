using System.Text.RegularExpressions;
using Interfaces;

namespace Web.API.Utils
{
    public class PhoneCleaner : IPhoneCleaner
    {
        public CleanPhone Clean(string dirtyPhone)
        {
            var phone = Regex.Replace(dirtyPhone, @"[^\d]", "");

            if (phone.StartsWith("8"))
                phone = phone.Remove(0, 1);
            else if (phone.StartsWith("7"))
                phone = phone.Remove(0, 1);

            return new CleanPhone(dirtyPhone, phone);
        }
    }
}