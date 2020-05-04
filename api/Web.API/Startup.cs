using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using Web.API;
using Web.API.Controllers;
using Microsoft.EntityFrameworkCore;
using Web.API.Queries;
using Interfaces;
using DAL;
using BL.Commands;
using DAL.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
//using Web.API.Services;
//using Web.API.Services.Models;
using Web.API.Utils;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment HostingEnvironment { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<EfContext>(
              (serviceProvider, builder) =>
              {
                  builder.UseNpgsql(Configuration.GetConnectionString("WebDb"));
              });

            services.AddCors();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(x =>
                     {
                         x.SerializerSettings.ContractResolver = new DefaultContractResolver
                         {
                             NamingStrategy = new CamelCaseNamingStrategy()
                         };
                         x.SerializerSettings.Converters.Add(new IntConverter());
                         x.SerializerSettings.Converters.Add(new DateTimeConverter());
                     });
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                   .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = HostingEnvironment.IsProduction();
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = false,
                            ValidIssuer = AuthOptions.ISSUER,

                            ValidateAudience = false,
                            ValidAudience = AuthOptions.AUDIENCE,
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            ValidateIssuerSigningKey = true,
                        };
                    });
            
            services.AddAuthorization(options =>
            {
                var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
                    JwtBearerDefaults.AuthenticationScheme,
                    "Bearer");
                defaultAuthorizationPolicyBuilder =
                    defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
                options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
            });
            
            services.AddLogging();

            services.AddSwaggerGen(c =>
            {
                c.DocumentFilter<SecurityRequirementsDocumentFilter>();
                c.AddSecurityDefinition("Authorization", new ApiKeyScheme
                {
                    Name = "Authorization",
                    Type = "apiKey",
                    In = "header"
                });

                c.SwaggerDoc("v1", new Info { Title = "Auto42 API", Version = "v1" });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            
            services.AddQueries();
            services.AddCommands();

            services.AddTransient<IStorageProvider, StorageProvider>();
            services.AddScoped<ICurrentUser, CurrentUser>();
            //services.AddTransient(typeof(ILog<>), typeof(DAL.Log<>));
            services.AddTransient<IValidatorFactory, ValidatorFactory>();
            services.AddScoped<ICurrentOperation, CurrentOperation>();
            services.AddTransient<IFileMetadataReader, FileMetadataReader>();
  //          services.AddTransient<INotificationService, EmailNotificationService>();
  //          services.AddTransient<IEmailMessageGenerator, EmailMessageGenerator>();
   //         services.Configure<EmailSettings>(options => Configuration.GetSection("EmailSettings").Bind(options));
            //services.AddTransient<IPushSender, PushSender>();
            services.AddGenericTypes(typeof(IValidator<>), "Web.API");
            services.AddTransient<IPhoneCleaner, PhoneCleaner>();
            services.AddTransient(typeof(IPasswordHasher<>), typeof(PasswordHasher<>));
            services.AddTransient<IRandomHelper, RandomHelper>();
          
            services.AddTransient<ISmsSender, SmsSender>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddHostedService<StartupService>();
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, EfContext db)
        {
            HostingEnvironment = env;

            app.UseCors(x =>
                   x.AllowAnyOrigin()
                  .AllowCredentials()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
              );

            db.Database.Migrate();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseSwagger(options => { });
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Proshira API V1"); });

            app.UseAuthentication();

            app.Use(async (HttpContext context, Func<Task> next) =>
            {
                //var log = context.RequestServices.GetService<ILog<Controller>>();
                try
                {
                    await next.Invoke();

                    //await log.FlushAsync();
                }
                catch (Exception e)
                {
                    //log.Critical(e);

                    var operationId = 0;//context.RequestServices.GetService<ICurrentOperation>().GetCurrentOperationId();
                    var result = JsonConvert.SerializeObject(new ApiResultCode("INVALID_OPERATION", "Неизвестная ошибка: "+e.Message, true)
                    {
                        OperationId = operationId,
                        Data = e

                    },
                    new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy()
                        }
                    });

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = 400;
                    await context.Response.WriteAsync(result);
                }
            });

            app.UseMvc();

            app.Use(async (HttpContext context, Func<Task> next) =>
            {
                //if (context.Request.Path.Value.Contains("/api/"))
                //{
                //    var log = context.RequestServices.GetService<ILog<Controller>>();
                //    await log.FlushAsync();
                //}

                await next.Invoke();

                if (context.Response.StatusCode == 404 && !context.Request.Path.Value.Contains("/api"))
                {
                    context.Request.Path = new PathString("/index.html");
                    await next.Invoke();
                }

            });

            app.UseDefaultFiles(new DefaultFilesOptions()
            {
                DefaultFileNames = new List<string>() { "index.html" }
            });
            app.UseStaticFiles();
        }
    }
}
