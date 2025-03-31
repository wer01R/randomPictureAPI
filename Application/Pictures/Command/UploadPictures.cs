using System;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Application.Pictures.Command;

public class UploadPictures
{
    public class Command() : IRequest {
        public required List<IFormFile> files {get; set;}
        public required string filesPath {get; set;}
    }

    public class Handler : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            if(request.files == null || request.files.Count == 0) return;
            
            foreach(var file in request.files) {
                string filePath = Path.Combine(request.filesPath, file.FileName);
                using(var stream = new FileStream(filePath, FileMode.Create)) {
                    await file.CopyToAsync(stream);
                }
            }
        }
    }
}   

