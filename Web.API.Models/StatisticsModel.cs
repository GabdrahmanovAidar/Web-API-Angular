using System;
using System.Collections.Generic;
using System.Text;

namespace Web.API.Models
{
    public class StatisticsModel
    {
        public int Id { get; set; }
        public UserModel User { get; set; }
        public decimal? Balance { get; set; }


    }
}
