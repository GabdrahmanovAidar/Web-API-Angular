using DAL.Entities;
using System;

namespace DAL.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatronymicName { get; set; }
        public string Phone { get; set; }
        public int? LoginId { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public string PhotoUploadId { get; set; }
        public string UserName { get; set; }
        
        public bool EmailConfirmed { get; set; }
        
        public string OperationsToken { get; set; }
        public string Email { get; set; }

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
