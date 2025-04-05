using System;
using Application.RandomPictures.Query;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AllPicturesController : BaseApiController
{   
    [HttpGet]
    public async Task<ActionResult<StaticImage>> getAllPictures() {
        List<Picture> pictures = await mediator.Send(new GetAllPictures.Query {filePath = filesPath});
        List<string> files = new List<string>();
        foreach(var picture in pictures) {
            files.Add(Path.GetFileName(picture.FilePath));
        }
        return new StaticImage { path = "images", files = files};
    }
}
