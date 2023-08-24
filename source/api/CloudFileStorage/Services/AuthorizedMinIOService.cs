using CloudFileStorage.DTOs;
using CloudFileStorage.Services;
using Microsoft.Extensions.FileProviders;
using Minio.DataModel;
using System.Collections.Generic;
using System.IO;

namespace CloudFileStorage.Api.Services
{
    public class AuthorizedMinIOService
    {
        private readonly MinIOService minIOService;
        private const string emptyPath = "\"\"";


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

        public async Task<IEnumerable<FileInfoDto>> Search(string userName, string query)
        {
            IEnumerable<FileInfoDto> fileInfos = await minIOService.Search(Combine(userName, emptyPath), query);

            return RemoveUserName(fileInfos);
        }

        public async Task<IEnumerable<FileInfoDto>> SearchInFolders(string userName, string query)
        {
            IEnumerable<FileInfoDto> fileInfos = await minIOService.SearchInFolders(Combine(userName, query));

            return RemoveUserName(fileInfos);
        }
        public async Task Remove(string username, string path)
        {
            await minIOService.Remove(Combine(username, path));
        }

        private IEnumerable<FileInfoDto> RemoveUserName(IEnumerable<FileInfoDto> fileInfos)
        {
            return fileInfos.Select(x =>
            {
                var userSlashIndex = x.Path.IndexOf("/");
                var skipedUserAndSlah = x.Path.Substring(userSlashIndex + 1);

                x.Path = skipedUserAndSlah;

                return x;
            });
        }

        private string Combine(string userName, string path)
        {
            var userFiles = $"{userName}-files";

            var currentPath = path;

            if (path.Equals(emptyPath)) { currentPath = ""; }
            
            return $"{userFiles}/{currentPath}";
        }
    }
}
