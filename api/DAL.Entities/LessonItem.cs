using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class LessonItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }

        public static class Statuses
        {
            public const string Active = "ACTIVE";
            public const string Deleted = "DELETED";

            public static string[] Activity = new[]
            {
                Active,
                Deleted
            };
        }
    }
}
