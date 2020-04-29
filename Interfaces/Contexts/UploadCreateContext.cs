using DAL.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Interfaces.Contexts
{
    public class UploadCreateContext : IContext
    {
        public Upload Upload { get; set; }
    }
}
