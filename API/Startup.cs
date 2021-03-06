
using API.Controllers;
using API.Extensions;
using API.Middleware;
using API.SignalR;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt => {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseXContentTypeOptions();

            app.UseReferrerPolicy(opt => opt.NoReferrer());

            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());

            app.UseXfo(opt => opt.Deny());

            app.UseCspReportOnly(opt => opt
                .BlockAllMixedContent()
                .StyleSources(src => src.Self()
                        .CustomSources("https://fonts.googleapis.com", 
                                        "sha256-oFySg82XYSNiSd+Q3yfYPD/rxY6RMDMJ0KxzGG74iGM="))
                .FontSources(src => src.Self()
                        .CustomSources("https://fonts.gstatic.com", "data:"))
                .FormActions(src => src.Self())
                .FrameAncestors(src => src.Self())
                .ImageSources(src => src.Self()
                        .CustomSources("https://scontent.fyyc5-1.fna.fbcdn.net",
                                        "https://res.cloudinary.com/",
                                        "data:",
                                        "https://www.facebook.com"))
                .ScriptSources(src => src.Self()
                        .CustomSources("sha256-u+j3524wz+Qo9KC9rsh910x2Q6yk4zeUnCx3ur6wnfQ=", 
                                        "sha256-RGAh12LVr4XZ1bzLam4SLaDdPUvERvjIdt2CXmfjbsw=",
                                        "https://connect.facebook.net"))
                );

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            else
            {
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    await next.Invoke();
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
