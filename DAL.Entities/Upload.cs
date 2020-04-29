using System;

namespace DAL.Entities
{
    public class Upload
    {
        public string   Id          { get; set; }
        public int      SizeInBytes { get; set; }
        public string   Extension   { get; set; }
        public string   ContentType { get; set; }
        public string   Type        { get; set; }
        public DateTime CreatedDate { get; set; }

        public int Width  { get; set; }
        public int Height { get; set; }

        public int    Bitrate  { get; set; }
        public double Duration { get; set; }
        public static class Types
        {
            public const string Photo = "PHOTO";
            public const string Audio = "AUDIO";
            public const string Video = "VIDEO";
        }

    }
}