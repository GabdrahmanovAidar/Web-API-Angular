using System;
using System.Collections.Generic;
using DAL.Entities;

namespace Web.API.Models
{
    public class UserModel : IDateTimeSetOffset
    {
        public int? Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatronymicName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public PhotoUploadModel PhotoUpload { get; set; }
        public string Type { get; set; }
        public bool? IsEmailConfirmed { get; set; }



        public void SetOffset(int minutes)
        {
            CreatedDate = CreatedDate?.AddMinutes(minutes);
        }
    }
}
