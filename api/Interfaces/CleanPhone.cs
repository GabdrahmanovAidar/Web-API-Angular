namespace Interfaces
{
    public class CleanPhone
    {
        public CleanPhone(string original, string clean)
        {
            Original = original;
            Clean = clean;
        }

        public string Original { get; internal set; }
        public string Clean { get; internal set; }

        public static implicit operator string (CleanPhone phone)
        {
            return phone?.Clean;
        }
    }
}
