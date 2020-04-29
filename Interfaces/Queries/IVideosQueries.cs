using System;
using System.Collections.Generic;
using System.Text;
using Web.API.Models;

namespace Interfaces.Queries
{
    public interface IVideosQueries : IQueryBase<VideoModel, VideoFilter>
    {
    }
}
