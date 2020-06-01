using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class VideoUpdateContext : IContext
    {
        public int Id { get; set; }
        public List<Upload> Videos { get; set; }
    }
}
