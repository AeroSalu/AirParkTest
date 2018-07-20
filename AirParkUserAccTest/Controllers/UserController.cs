using AirParkUserAccTest.Models;
using AirParkUserAccTest.Repositories;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AirParkUserAccTest.Controllers
{
    [Route("api/user")]
    public class UserController : ApiController
    {
        private readonly IUser _userRepository;

        public UserController(IUser userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
           return _userRepository.GetAll();
        }

        // GET: api/User/5
        [HttpGet]
        public HttpResponseMessage GetUser(int id)
        {
            var user = _userRepository.Get(id);
            if(User == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

        // POST: api/User
        [HttpPost]
        public HttpResponseMessage AddUser([FromBody]User model)
        {
            if(!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var user = _userRepository.Add(model);

            return Request.CreateResponse(HttpStatusCode.OK, user);

        }

        // PUT: api/User/5
        [HttpPut]
        public HttpResponseMessage UpdateUser(int id, [FromBody]User model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var user = _userRepository.Update(model);

            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

        // DELETE: api/User/5
        [HttpDelete]
        public HttpResponseMessage DeleteUser(int id)
        {
            var result = _userRepository.Delete(id);

            if (result == false)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
