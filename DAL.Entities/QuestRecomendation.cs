using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class QuestRecomendation
    {
        public int Id { get; set; }
        public string PhotoUploadId { get; set; }
        public string Inventory { get; set; }
        public string TimeSpend { get; set; }
        public int QuestId { get; set; }
    }
}
