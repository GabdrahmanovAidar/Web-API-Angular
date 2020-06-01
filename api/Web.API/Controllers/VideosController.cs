using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using FluentValidation;
using Interfaces;
using Interfaces.Contexts;
using Interfaces.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.API.Models;

namespace Web.API.Controllers
{
    [Route("api/videos")]
    [ApiController]
    public class VideosController : Controller
    {
        private readonly ICommandHandler _commandHandler;
        private readonly IVideosQueries _videosQueries;
        public VideosController(ICommandHandler commandHandler, IVideosQueries videosQueries)
        {
            _commandHandler = commandHandler;
            _videosQueries = videosQueries;
        }
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(VideoModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id, int time_offset = 0)
        {
            var video = await _videosQueries.GetById(id);

            if (video == null)
            {
                return BadRequest(new ApiResultCode("NEWS_NOT_FOUND", "Видео не найдено"));
            }
            video.SetOffset(time_offset);
            return Ok(video);
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(List<VideoModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetList(int page = 1, int size = 1000, int time_offset = 0, string status = null)
        {
            var result = await _videosQueries.GetList(new VideoFilter
            {
                Page = page,
                Size = size,
                Status = status
            });
            result.List.ForEach(x => x.SetOffset(time_offset));
            return Ok(result);
        }

        [HttpPost("")]
        [ProducesResponseType(typeof(VideoModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] VideoModel model, int time_offset = 0)
        {
            model.SetOffset((-1) * time_offset);

            //var video = GetVideo(model);
            var videos = GetVideos(model.Videos);

            var commandResult = await _commandHandler.Execute(new VideoCreateContext
            {
                //Video = video,
                Videos = videos
            });

            if (commandResult.IsSuccess)
            {
              //  var videoModel = await _videosQueries.GetById(video.Id);
                model.SetOffset(time_offset);
                return Ok(/*videoModel*/);
            }
            else
            {
                return BadRequest(new ApiResultCode(commandResult));
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(VideoModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] VideoModel model, int time_offset = 0)
        {
            model.SetOffset((-1) * time_offset);

            var videos = GetVideos(model.Videos);

            var commandResult = await _commandHandler.Execute(new VideoUpdateContext
            {
                
                Id = id,
                Videos = videos
            });

            if (commandResult.IsSuccess)
            {
                var videosModel = await _videosQueries.GetById(id);
                videosModel.SetOffset(time_offset);
                return Ok();
            }
            else
            {
                return BadRequest(new ApiResultCode(commandResult));
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResultCode), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _commandHandler.Execute(new VideoDeleteContext
            {
                Id = id
            });
            return result.IsSuccess ? (IActionResult)Ok() : BadRequest(new ApiResultCode(result));
        }

        private List<Upload> GetVideos(IEnumerable<VideoUploadModel> model)
        {
            return model.Select(x => new Upload { Id = x.Id }).ToList();
        }

        

    }
}