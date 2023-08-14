using CloudFileStorage.Api.Services;
using CloudFileStorage.Services;
using CloudFileStorage.Startup;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Minio.AspNetCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRestApi();
builder.Services.AddAuthentication(builder.Configuration);

builder.Services.AddMinio(options =>
{
    options.Endpoint = "localhost:9000";
    options.SecretKey = "91ljvA3fOPR2E8B7GftAUrYVP4Eu4q8lZh2rTdvi";
    options.AccessKey = "K3StAn1UUea05KT5W9ZI";

});

builder.Services.AddTransient<MinIOService>();
builder.Services.AddTransient<AuthorizedMinIOService>();

var app = builder.Build();

app.AddRestApi();
app.AddAuthentication();

if (app.Environment.IsDevelopment())
{
    app.MapGet("/debug/routes", (IEnumerable<EndpointDataSource> endpointSources) =>
    {
        var sb = new StringBuilder();
        var endpoints = endpointSources.SelectMany(es => es.Endpoints);
        foreach (var endpoint in endpoints)
        {
            if (endpoint is RouteEndpoint routeEndpoint)
            {
                sb.Append("RawText: ")
                .AppendLine(routeEndpoint.RoutePattern.RawText);

                sb.Append("PathSegments: ");
                routeEndpoint.RoutePattern.PathSegments.Select(x => sb.Append(x).AppendLine());
                sb.AppendLine();

                sb.Append("Parameters: ");
                routeEndpoint.RoutePattern.Parameters.Select(x => sb.Append(x).AppendLine());
                sb.AppendLine();

            }

            var routeNameMetadata = endpoint.Metadata.OfType<RouteNameMetadata>().FirstOrDefault();
            sb.Append("RouteName: ")
            .Append(routeNameMetadata?.RouteName)
            .AppendLine(); ;

            var httpMethodsMetadata = endpoint.Metadata.OfType<HttpMethodMetadata>().FirstOrDefault();
            sb.Append("HttpMethods: ");
            httpMethodsMetadata?.HttpMethods.Select(x => sb.Append(x).AppendLine());
            sb.AppendLine(); // [GET, POST, ...]

            sb.Append("=============").Append("\n");
        }
        return sb.ToString();
    });
}

app.Run();