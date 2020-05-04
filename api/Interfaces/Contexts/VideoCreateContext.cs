using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces.Contexts
{
    public class VideoCreateContext : IContext
    {
        public List<Upload> Videos { get; set; }
    }
}
