using System;
using System.Collections.Generic;

using System.Text;

namespace DAL.Entities
{
    public class Login
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Hash { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }

        public static class Types
        {
            public const string User = "USER";
            public const string Supporter = "SUPPORTER";
            public const string SystemAdministrator = "SYSTEM_ADMINISTRATOR";
            public const string Deliveler = "DELIVELER";
        }

        public static class Statuses
        {
            public const string Active = "ACTIVE";
            public const string Deleted = "DELETED";
            public const string Blocked = "BLOCKED";

            public static string[] Available = new[]
            {
                Active,
                Deleted,
                Blocked
            };
        }


    }
}

