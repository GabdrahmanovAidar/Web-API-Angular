using System;
using System.IO;
using System.Threading.Tasks;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TagLib;
using Web.API.Models;

namespace Web.API.Controllers
{
    [Route("api/uploads")]
    [Authorize(Roles = Login.Types.SystemAdministrator)]
    public class UploadsController : Controller
    {
        private readonly ICommandHandler _commandHandler;
        private readonly IStorageProvider _storageProvider;
        private readonly ICurrentOperation _currentOperation;
        private readonly IFileMetadataReader _fileMetadataReader;

        public UploadsController(
            ICommandHandler commandHandler,
            IStorageProvider storageProvider,
            ICurrentOperation currentOperation,
            IFileMetadataReader fileMetadataReader)
        {
            _commandHandler = commandHandler;
            _storageProvider = storageProvider;
            _currentOperation = currentOperation;
            _fileMetadataReader = fileMetadataReader;
        }

        /// <summary>
        /// Загрузка файлов
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(PhotoUploadModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(UploadModel), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(IFormFile file)
        {
            try
            {
                int limitSize = User.Identity.IsAuthenticated ? 100 : 15;

                var size = file.Length;
                if (size > limitSize * 1000 * 1000 || size == 0)
                {
                    //_logger.Error($"INVALID_SIZE Supports less {limitSize} MB");

                    return BadRequest(new ApiResultCode("INVALID_SIZE", $"Supports less {limitSize} MB", true)
                    {
                        OperationId = _currentOperation.GetCurrentOperationId()
                    });
                }

                var stream = file.OpenReadStream();
                stream.Position = 0;

                var memoryStream = new MemoryStream();
                await stream.CopyToAsync(memoryStream);

                var bytes = memoryStream.ToArray();

                var uploadEntity = new Upload
                {
                    Id = Guid.NewGuid().ToString(),
                    Extension = Path.GetExtension(file.FileName),
                    SizeInBytes = (int) size,
                    ContentType = file.ContentType
                };

                MediaTypes mediaType;
                try
                {
                    mediaType = _fileMetadataReader.GetMediaType(bytes, file.FileName);
                }
                catch
                {
                    mediaType = MediaTypes.Video;
                }
                if (mediaType == MediaTypes.Audio)
                {
                    var audioMetadata = _fileMetadataReader.GetAudioMetaData(bytes, file.FileName);
                    if (audioMetadata != null)
                    {
                        uploadEntity.Bitrate = audioMetadata.Bitrate;
                        uploadEntity.Duration = audioMetadata.Duration;
                        uploadEntity.Type = Upload.Types.Audio;
                    }
                }
                else if (mediaType == MediaTypes.Photo)
                {
                    var photoMetadata = _fileMetadataReader.GetPhotoMetaData(bytes, file.FileName);
                    if (photoMetadata != null)
                    {
                        uploadEntity.Width = photoMetadata.Width;
                        uploadEntity.Height = photoMetadata.Height;
                        uploadEntity.Type = Upload.Types.Photo;
                    }
                }

                else if ((int) mediaType == 3 || mediaType == MediaTypes.Video)
                {
                    var videoMetadata = _fileMetadataReader.GetVideoMetaData(bytes, file.FileName);
                    if (videoMetadata != null)
                    {
                        uploadEntity.Width = videoMetadata.Width;
                        uploadEntity.Height = videoMetadata.Height;
                        uploadEntity.Duration = videoMetadata.Duration;
                        uploadEntity.Type = Upload.Types.Video;
                    }
                }

                else
                {
                    return BadRequest(new ApiResultCode("INVALID_FILE", "Некорректный файл"));
                }

                memoryStream.Position = 0;
                await _storageProvider.UploadAsync(memoryStream, $"{uploadEntity.Id}{uploadEntity.Extension}");

                var context = new UploadCreateContext
                {
                    Upload = uploadEntity
                };

                var result = await _commandHandler.Execute(context);
                if (result.IsSuccess)
                {
                    if (mediaType == MediaTypes.Photo)
                    {
                        var model = new PhotoUploadModel
                        {
                            Id = context.Upload.Id.ToString(),
                            SizeInBytes = context.Upload.SizeInBytes,
                            Extension = context.Upload.Extension,
                            Width = context.Upload.Width,
                            Height = context.Upload.Height
                        };
                        return Ok(model);
                    }

                    if ((int) mediaType == 3)
                    {
                        var model = new VideoUploadModel
                        {
                            Id = context.Upload.Id.ToString(),
                            SizeInBytes = context.Upload.SizeInBytes,
                            Extension = context.Upload.Extension,
                            Width = context.Upload.Width,
                            Height = context.Upload.Height,
                            Duration = context.Upload.Duration,
                            ContentType = context.Upload.ContentType
                        };
                        return Ok(model);
                    }

                    return Ok(new UploadModel
                    {
                        Extension = context.Upload.Extension,
                        Id = context.Upload.Id,
                        SizeInBytes = context.Upload.SizeInBytes
                    });
                }
                else
                {
                    return BadRequest(new ApiResultCode(result));
                }
            }
            catch (Exception e)
            {
                return BadRequest($"{e.Message}: {e.ToString()}");
            }
        }

        //[HttpGet("raw/{filename}")]
        //public async Task<IActionResult> GetRaw(string filename)
        //{
        //    var result = await _storageProvider.DownloadAsync(filename);
        //    return File(result, "application/octet-stream");
        //}
    }
}