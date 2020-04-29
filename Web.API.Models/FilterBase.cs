namespace Web.API.Models
{
    public class FilterBase : IFilter
    {
        public string OrderBy { get; set; }
        public int    Size    { get; set; }
        public int    Page    { get; set; }
    }
}