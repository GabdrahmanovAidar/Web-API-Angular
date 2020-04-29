using System;
using System.Collections.Generic;

namespace Web.API.Models
{
    public class PageResultModel<T>
    {
        private List<T> _list;
        public List<T> List
        {
            get => _list ?? (_list = new List<T>());
            set => _list = value;
        }

       

        public int TotalCount { get; set; }
        public int TotalPages => (int)Math.Ceiling((decimal)TotalCount / Size);



        private int _size;

        public int Size
        {
            get => _size == 0 ? (_size = 10) : _size;
            set => _size = value;
        }

        public int Page { get; set; }
    }
}
