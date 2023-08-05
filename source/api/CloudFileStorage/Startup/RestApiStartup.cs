namespace CloudFileStorage.Startup
{
    public static class RestApiStartup
    {
        /// <summary>
        /// Register REST API related services.
        /// </summary>
        /// <param name="services">The services to act on.</param>
        public static void AddRestApi(this IServiceCollection services)
            => services.AddControllers();

        /// <summary>
        /// Register REST routes and configure CORS.
        /// </summary>
        /// <param name="app">The app to act on.</param>
        public static void AddRestApi(this WebApplication app)
        {
            app.MapControllers();
            app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        }
    }
}
