using System;
using Application.Shared;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Pictures.Query;

public class GetRandomPicture 
{
    public class Query : IRequest<Picture> {}
    public class Handler(AppDbContext context) : IRequestHandler<Query, Picture>
    {
        public async Task<Picture> Handle(Query request, CancellationToken cancellationToken)
        {
            List<Picture> pictures = await context.Pictures.ToListAsync(cancellationToken);
            int r = SharedRandom.r.Next(pictures.Count());
            return pictures[r];
        }
    }
}
