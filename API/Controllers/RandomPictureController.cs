using System.Threading.Tasks;
using Application.Pictures.Query;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class RandomPictureController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetRandomPicture()
    {
        Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
        Picture p = await mediator.Send(new GetRandomPicture.Query{});
        return PhysicalFile(p.FilePath, p.Type ?? "application/octet-stream");
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRandomPictureBySeed(string id) {
        Picture p = await mediator.Send(new GetRandomPictureBySeed.Query {id = id});
        return PhysicalFile(p.FilePath, p.Type ?? "application/octet-stream");
    }
}
