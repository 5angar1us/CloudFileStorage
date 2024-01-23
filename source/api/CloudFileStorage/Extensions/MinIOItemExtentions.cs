using CloudFileStorage.DTOs;
using Minio.DataModel;
using System.Drawing;
using System.Runtime.CompilerServices;

namespace CloudFileStorage.Api.Extensions
{
    public static class MinIOItemExtentions
    {
        public static FileInfoDto ConvertToDto(this Item item)
        {
            return new FileInfoDto()
            {
                Size = item.Size,
                DateTime = item.LastModifiedDateTime,
                Path = item.Key,
                IsDir = item.IsDir,
                Name = GetName(item),
            };
        }

        private static string GetName(Item item)
        {
            if(item.IsDir)
            {
                var splittedPath = item.Key.Split("/");
                var folderNameIndex = splittedPath.Length - 2;
                return splittedPath[folderNameIndex];
            }
            else
            {
                return item.Key.Split("/").Last();
            }
        }
    }
}
