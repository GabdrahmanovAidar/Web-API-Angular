using Interfaces.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Models;

namespace Web.API.Queries
{
    public class RequestQueries : IRequestQueries
    {
        public Task<RequestModel> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<PageResultModel<RequestModel>> GetList(RequestFilter filter)
        {
            throw new NotImplementedException();
        }
    }
}
