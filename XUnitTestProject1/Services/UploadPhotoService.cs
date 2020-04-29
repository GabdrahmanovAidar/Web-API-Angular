using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NUnit.Framework;
using Web.API.Models;

namespace XUnitTestProject1
{
    internal class UploadPhotoService : ApiBase<PhotoUploadModel>
    {
        protected override string Resource => "uploads";

        public async Task<PhotoUploadModel> Create()
        {
            var bytes          = File.ReadAllBytes(TestContext.CurrentContext.TestDirectory+"/300x300.jpg");
            var requestContent = new MultipartFormDataContent();
            //    here you can specify boundary if you need---^
            var imageContent = new ByteArrayContent(bytes);
            imageContent.Headers.ContentType =
                MediaTypeHeaderValue.Parse("image/jpeg");

            requestContent.Add(imageContent, "file", "image.jpg");

            var httpClient = await GetAuthenticatedHttpClient();

            var result = await httpClient.PostAsync($"{Configs.Api}/uploads", requestContent);
            if (result.IsSuccessStatusCode)
            {
                var str = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<PhotoUploadModel>(str);
            }

            throw new Exception();

        }
    }
}