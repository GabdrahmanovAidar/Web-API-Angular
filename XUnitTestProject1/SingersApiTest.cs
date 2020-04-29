using System;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Bogus;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NUnit.Framework;
using Web.API.Models;

namespace XUnitTestProject1
{
   [TestFixture]
    public class UserApiTest
    {
        [Test]
        public async Task PostUser()
        {
            var faker = new Faker<UserModel>("ru");
            faker
               .RuleFor(x => x.FirstName, f => f.Lorem.Word())
               .RuleFor(x => x.LastName, f => f.Lorem.Word())
               .RuleFor(x => x.PatronymicName, f => f.Lorem.Word())
               .RuleFor(x => x.Phone, f => f.Lorem.Word())
               .RuleFor(x => x.Status, "ACTIVE")
                ;



            var model = faker.Generate();
            model.Status = "ACTIVE";

            var httpClient = await GetAuthenticatedHttpClient();
            var content    = GetJsonContent(model);
            var result     = await httpClient.PostAsync($"{Configs.Api}/users", content);
            if (result.IsSuccessStatusCode)
            {
                var str = await result.Content.ReadAsStringAsync();

                var data =  JsonConvert.DeserializeObject<UserModel>(str);
            }

            throw new Exception();

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


        public async Task<HttpClient> GetAuthenticatedHttpClient()
        {
            var token = await Auth();
            var http  = new HttpClient();
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

                var str     = await response.Content.ReadAsStringAsync();
                var content = JsonConvert.DeserializeObject<LoginResultModel>(str);


                return content.AccessToken;
            }
        }
    }


}