using System;
using Application.Pictures.Command;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UpdatePictureController: BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> update() {
        await mediator.Send(new UpdatePictures.Command{filesPath = filesPath});
        return Ok();
    }
}
