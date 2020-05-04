using DAL.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;


namespace Interfaces.Contexts
{
    public class RequestCreateContext: IContext
    {
        public Request Request { get; set; }
    }
}
