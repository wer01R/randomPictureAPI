using System;
using Application.Pictures.Command;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UploadPictureController: BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<string>> UploadPicture(List<IFormFile> files) {
        await mediator.Send(new UploadPictures.Command {files = files, filesPath = filesPath});
        await mediator.Send(new UpdatePictures.Command {filesPath = filesPath});
        return Ok();
    }
}
