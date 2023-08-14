﻿using CloudFileStorage.Api.Services;
using CloudFileStorage.DTOs;
using CloudFileStorage.Routing;
using CloudFileStorage.Services;
using HttpMultipartParser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using static System.Net.Mime.MediaTypeNames;

namespace CloudFileStorage.Controllers
{
    [ApiV1Controller]
    public class FileController : Controller
    {
        AuthorizedMinIOService authorizedMinIOService;

        public FileController(AuthorizedMinIOService authorizedMinIOService)
        {
            this.authorizedMinIOService = authorizedMinIOService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> SearchInFolders(string query)
        {
            var items = await authorizedMinIOService.SearchInFolders(GetUserName(), query);

            return Ok(items);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Search(string query)
        {
            var items = await authorizedMinIOService.Search(GetUserName(), query);

            return Ok(items);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> FileGet(string path)
        {
            var memoryStream = new MemoryStream();
            var objectStat = await authorizedMinIOService.GetFile(GetUserName(), path, (stream) =>
            {
                if (stream != null)
                {
                    stream.CopyTo(memoryStream);
                    memoryStream.Seek(0, SeekOrigin.Begin);
                }
                else
                {
                    memoryStream = null;
                }
            });

            return File(memoryStream, objectStat.ContentType, objectStat.ObjectName);
        }

        [HttpPost]
        [Authorize]
        public async Task<IResult> FileSet()
        {
            MultipartFormDataParser multipartParser = await MultipartFormDataParser.ParseAsync(Request.Body).ConfigureAwait(false);

            const int maxSizeInMB = 5;
            const long maxSizeInBytes = maxSizeInMB * 1024 * 1024;

            if (multipartParser.Files.Any(x => x.Data.Length > maxSizeInBytes)) 
                return Results.BadRequest($"At least one of the files is larger than the allowed size of {maxSizeInMB} MB");

            foreach (FilePart fileInfo in multipartParser.Files)
            {
                MemoryStream memory = new MemoryStream();

                fileInfo.Data.CopyTo(memory);
                memory.Seek(0, SeekOrigin.Begin);

                await authorizedMinIOService.PutFile(GetUserName(), fileInfo.FileName, memory);
            }

            return Results.Ok();

        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> FileDelete(string path)
        {
           await authorizedMinIOService.Remove(GetUserName(), path);

            return Ok();
        }

        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> FilePatch(string path, string newPath)
        {
            await authorizedMinIOService.Replace(GetUserName(), path, newPath);

            return Ok();
        }

        private String GetUserName()
        {
            var user = HttpContext.User;
            var userFound = user.Identity != null;
            if (!userFound)
               throw new Exception();

            return user.Identity!.Name!;
        }
    }
}
