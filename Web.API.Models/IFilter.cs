namespace Web.API.Models
{
    public interface IFilter
    {
        string OrderBy { get; set; }
        int    Size    { get; set; }
        int    Page    { get; set; }
    }
}