using CloudFileStorage.DTOs;
using Minio;
using Minio.DataModel;
using Minio.Exceptions;
using System.Collections;
using System.Reactive.Linq;

namespace CloudFileStorage.Services
{
    public class MinIOService
    {
        private readonly MinioClient minioClient;

        private readonly ILogger<MinIOService> logger;

        private const string bucket = "cloud-file-storage";

        public MinIOService(MinioClient minioClient, ILogger<MinIOService> logger)
        {
            this.minioClient = minioClient;
            this.logger = logger;
        }


        public async Task PutFile(string fileName, Stream fileStream)
        {
            try
            {
                PutObjectArgs args = new PutObjectArgs()
                    .WithBucket(bucket)
                    .WithObject(fileName)
                    .WithStreamData(fileStream)
                    .WithObjectSize(fileStream.Length)
                    .WithContentType("application/octet-stream");

                await minioClient.PutObjectAsync(args);
            }
            catch (MinioException e)
            {
                throw;
            }
        }

        public async Task<ObjectStat> GetFile(string name, Action<Stream> callback)
        {
            try
            {
                StatObjectArgs statObjectArgs = new StatObjectArgs()
                                       .WithBucket(bucket)
                                       .WithObject(name);
                var objectStat = await minioClient.StatObjectAsync(statObjectArgs);

                GetObjectArgs getObjectArgs = new GetObjectArgs()
                                                  .WithBucket(bucket)
                                                  .WithObject(objectStat.ObjectName)
                                                  .WithCallbackStream((stream) =>
                                                  {
                                                      callback(stream);
                                                  });

                var resultObjectStat = await minioClient.GetObjectAsync(getObjectArgs);

                return resultObjectStat;
            }
            catch (MinioException e)
            {
                throw;
            }
        }

        public async Task Remove(string name)
        {
            try
            {
                RemoveObjectArgs args = new RemoveObjectArgs()
                                              .WithBucket(bucket)
                                              .WithObject(name);
                await minioClient.RemoveObjectAsync(args);
            }
            catch (MinioException e)
            {
                throw;
            }
        }

        public async Task Replace(string path, string newPath)
        {
            try
            {
                var srcArgs = new CopySourceObjectArgs()
                    .WithBucket(bucket)
                    .WithObject(path);

                var args = new CopyObjectArgs()
                    .WithBucket(bucket)
                    .WithObject(newPath)
                    .WithCopyObjectSource(srcArgs);

                await minioClient.CopyObjectAsync(args);
                await Remove(path);
            }
            catch (MinioException e)
            {
                throw;
            }

        }

        public async Task<IEnumerable<FileInfoDto>> SearchInFolders(string query)
        {
            try
            {
                var queryWithoutQuotesAndSpaces = query.Replace("\"", "").Trim();

                ListObjectsArgs args = new ListObjectsArgs()
                                              .WithBucket(bucket)
                                              .WithRecursive(false)
                                              .WithPrefix(queryWithoutQuotesAndSpaces);

                IObservable<Item> items = minioClient.ListObjectsAsync(args) ?? Observable.Empty<Item>();

                return await items.Select(x =>
                {
                    return new FileInfoDto()
                    {
                        Size = x.Size,
                        DateTime = x.LastModifiedDateTime,
                        Path = x.Key,
                        IsDir = x.IsDir
                    };

                }).ToList();
            }
            catch (MinioException e)
            {
                throw;
            }
        }

        public async Task<IEnumerable<FileInfoDto>> Search(string basePath, string query)
        {
            try
            {
                

                ListObjectsArgs args = new ListObjectsArgs()
                                              .WithBucket(bucket)
                                              .WithRecursive(true)
                                              .WithPrefix(basePath);

                IObservable<Item> items = minioClient.ListObjectsAsync(args) ?? Observable.Empty<Item>();

                var queryWithoutQuotesAndSpaces = query.Replace("\"", "").Trim();

                if (String.IsNullOrEmpty(queryWithoutQuotesAndSpaces) == false)
                {
                    items = items.Where(x =>
                    {
                        return x.Key
                        .ToLower()
                        .Contains(query.ToLower());
                    });
                }

                return await items.Select(x =>
                {
                    return new FileInfoDto()
                    {
                        Size = x.Size,
                        DateTime = x.LastModifiedDateTime,
                        Path = x.Key,
                        IsDir = x.IsDir
                    };

                }).ToList();
            }
            catch (MinioException e)
            {
                throw;
            }
        }

        public async Task<IEnumerable<FileInfoDto>> SearchByPrefix(string query)
        {
            try
            {
                ListObjectsArgs args = new ListObjectsArgs()
                                              .WithBucket(bucket)
                                              .WithRecursive(true)
                                              .WithPrefix(query);

                IObservable<Item> items = minioClient.ListObjectsAsync(args) ?? Observable.Empty<Item>();

                return await items.Select(x =>
                {
                    return new FileInfoDto()
                    {
                        Size = x.Size,
                        DateTime = x?.LastModifiedDateTime,
                        Path = x.Key
                    };

                }).ToList();
            }
            catch (MinioException e)
            {
                throw;
            }
        }
    }
}
