using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces;

namespace Web.API.Utils
{
    public class RandomHelper : IRandomHelper
    {
        private static readonly Random Random = new Random();

        public int Generate6()
        {
            return Random.Next(100_000, 999_999);
        }
    }
}