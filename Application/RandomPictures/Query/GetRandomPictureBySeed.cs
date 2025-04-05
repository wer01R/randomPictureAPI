using System;
using System.Data.Common;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Pictures.Query;

public class GetRandomPictureBySeed
{
    public class Query : IRequest<Picture> {
        public required string id {get; set;}
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Picture>
    {
        public async Task<Picture> Handle(Query request, CancellationToken cancellationToken)
        {
            List<Picture> pictures = await context.Pictures.ToListAsync();
            int index = Math.Abs(request.id.GetHashCode()) % pictures.Count();
            return pictures[index];
        }
    }
}
