using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator; 
        private string? _filesPath;
        protected IMediator mediator => 
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("IMediator service is unavailable");
        protected string filesPath => 
            _filesPath ??= Path.Combine(Directory.GetCurrentDirectory(), "..", "public", "images");
    }
}
