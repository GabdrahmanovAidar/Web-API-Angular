using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CourseDuration { get; set; }
        public string Level { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Status { get; set; }

        public static class Statuses
        {
            public const string Active = "ACTIVE";
            public const string Deleted = "DELETED";

            public static string[] Available = new[]
            {
                Active,
                Deleted
            };
        }
    }
}
