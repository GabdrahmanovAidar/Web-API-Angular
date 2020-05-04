using DAL.Entities;

namespace Interfaces
{
    using System.IO;
    using System.Threading.Tasks;

    public interface IStorageProvider
    {
        Task UploadAsync(Stream fileStream, string fileName);

        Task<Stream> DownloadAsync(string fileName);
    }
}
