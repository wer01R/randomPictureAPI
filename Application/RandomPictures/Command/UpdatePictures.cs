using System;
using System.Diagnostics.CodeAnalysis;
using Application.Shared;
using Domain;
using MediatR;
using Persistence;

namespace Application.Pictures.Command;

public class UpdatePictures
{
    public class Command : IRequest {
        public required string filesPath;
    }
    public class CommandHandle(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            string[] files = Directory.GetFiles(request.filesPath);
            List<Picture> pictures = new List<Picture>();
            foreach(var file in files) {
                pictures.Add(new() {
                    FilePath = file,
                    Type = GetFileType.GetType(file)
                });
            }

            context.Pictures.RemoveRange(context.Pictures);
            await context.Pictures.AddRangeAsync(pictures, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
