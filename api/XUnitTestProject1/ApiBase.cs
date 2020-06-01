using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Web.API.Models;
using Web.API.Models;

namespace XUnitTestProject1
{
    public abstract class ApiBase<T>
    {

        public ApiBase()
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy()
                }
            };;
        }

        protected abstract string Resource { get; }
        public async Task<T> CreateNew(T model)
        {
            var httpClient = await GetAuthenticatedHttpClient();
            var content = GetJsonContent(model);
            var result = await httpClient.PostAsync($"{Configs.Api}/{Resource}", content);
            if (result.IsSuccessStatusCode)
            {
                var str = await result.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<T>(str);
            }

            throw new Exception();
        }

        public async Task<T> Update(object id, T model)
        {
            var httpClient = await GetAuthenticatedHttpClient();
            var content = GetJsonContent(model);

            var result = await httpClient.PutAsync($"{Configs.Api}/{Resource}/{id}", content);
            if (result.IsSuccessStatusCode)
            {
                var str = await result.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<T>(str);
            }

            throw new Exception(await result.Content.ReadAsStringAsync());
        }

        public async Task<PageResultModel<T>> Get()
        {
            var httpClient = await GetAuthenticatedHttpClient();
            var result = await httpClient.GetAsync($"{Configs.Api}/{Resource}");
            if (result.IsSuccessStatusCode)
            {
                var str = await result.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<PageResultModel<T>>(str);
            }

            throw new Exception();
        }

        public async Task<T> GetById(object id)
        {
            var httpClient = await GetAuthenticatedHttpClient();
            var result = await httpClient.GetAsync($"{Configs.Api}/{Resource}/{id}");
            if (result.IsSuccessStatusCode)
            {
                var str = await result.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<T>(str);
            }

            throw new Exception(await result.Content.ReadAsStringAsync());
        }

        public async Task<HttpClient> GetAuthenticatedHttpClient()
        {
            var token = await Auth();
            var http = new HttpClient();
            http.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

            return http;
        }

        private async Task<string> Auth()
        {
            using (var http = new HttpClient())
            {
                var response = await http.PostAsJsonAsync($"{Configs.Api}/tokens", new
                {
                    username = "admin@Web.ru",
                    password = "ALBj5D4oN6p"
                });

                var str = await response.Content.ReadAsStringAsync();
                var content = JsonConvert.DeserializeObject<LoginResultModel>(str);


                return content.AccessToken;
            }
        }

        private StringContent GetJsonContent<T>(T obj)
        {

            var jsonContent = JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy()
                }
            });

            return new StringContent(jsonContent, Encoding.UTF8, "application/json");

        }
    }
}
