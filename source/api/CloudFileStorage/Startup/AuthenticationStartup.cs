using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace CloudFileStorage.Startup
{
    public static class AuthenticationStartup
    {
        /// <summary>
        /// Register authentication related services.
        /// </summary>
        /// <param name="services">The services to act on.</param>
        /// <param name="configuration">The configuration.</param>
        public static void AddAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtOptions = configuration.GetSection("JwtBearer").Get<JwtBearerOptions>();
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = jwtOptions.Authority;
                    options.Audience = jwtOptions.Audience;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // https://stackoverflow.com/a/53627747, 
                        // https://nikiforovall.github.io/aspnetcore/dotnet/2022/08/24/dotnet-keycloak-auth.html
                        ValidateAudience = false,
                        NameClaimType = "preferred_username"
                    };
                });
        }

        /// <summary>
        /// Register authentication middleware.
        /// </summary>
        /// <param name="app">The app to act on.</param>
        public static void AddAuthentication(this WebApplication app)
        {
            app.UseAuthentication();
            app.UseAuthorization();
        }
    }
}
