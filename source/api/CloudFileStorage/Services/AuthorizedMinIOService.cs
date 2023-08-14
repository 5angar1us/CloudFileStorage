using CloudFileStorage.DTOs;
using CloudFileStorage.Services;
using Minio.DataModel;
using System.IO;

namespace CloudFileStorage.Api.Services
{
    public class AuthorizedMinIOService
    {
        private readonly MinIOService minIOService;

        public AuthorizedMinIOService(MinIOService minIOService)
        {
            this.minIOService = minIOService;
        }

        public async Task<ObjectStat> GetFile(string userName, string path, Action<Stream> value)
        {
            return await this.minIOService.GetFile(Combine(userName, path), value);
        }

        public async Task PutFile(string userName, string fileName, MemoryStream memory)
        {
            await this.minIOService.PutFile(Combine(userName, fileName), memory);
        }

        public async Task Replace(string userName, string path, string newPath)
        {
            await this.minIOService.Replace(Combine(userName, path), Combine(userName, newPath));
        }

        public async Task<IEnumerable<FileDto>> Search(string userName, string query)
        {
            return await minIOService.Search(Combine(userName, query));
        }
        public async Task Remove(string username, string path)
        {
            await minIOService.Remove(Combine(username, path));
        }

        private string Combine(string userName, string path)
        {
            var userFiles = $"{userName}-files";

            var pathWithoutQuotesAndSpaces = path.Replace("\"", "").Trim();

            return String.IsNullOrEmpty(pathWithoutQuotesAndSpaces) 
                ? $"{userFiles}/" 
                : $"{userFiles}/{pathWithoutQuotesAndSpaces}";
        }
    }
}
