namespace BL.Commands
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.Extensions.Configuration;
    using SelectelSharpCore;

    public class StorageProvider : IStorageProvider
    {
        private readonly IConfiguration _configuration;

        public StorageProvider(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task UploadAsync(Stream fileStream, string fileName)
        {
            var client = await Authorize();

            // TODO write extension to upload by stream
            byte[] bytes;
            using (MemoryStream ms = new MemoryStream())
            {
                fileStream.CopyTo(ms);
                bytes = ms.ToArray();
            }
            var uploadResult = await client.UploadFileAsync("darkxx/uploads", fileName, bytes);
            if(uploadResult != SelectelSharpCore.Models.File.UploadFileResult.Created)
            {
                throw new InvalidOperationException("Uploading failed");
            }
        }

        public async Task<Stream> DownloadAsync(string fileName)
        {
            var client = await Authorize();

            var fileResult = await client.GetFileAsync("darkxx/uploads", fileName);
            return new MemoryStream(fileResult.File);
        }

        private async Task<SelectelClient> Authorize()
        {
            var configSection = _configuration.GetSection("SelectelStorage");
            var apiKey = configSection["ApiKey"];
            var user = configSection["User"];

            var client = new SelectelClient();
            await client.AuthorizeAsync(user, apiKey);
            return client;
        }
    }
}
