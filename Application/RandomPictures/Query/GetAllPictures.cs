using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.RandomPictures.Query;

public class GetAllPictures
{
    public class Query : IRequest<List<Picture>> {
        public required string filePath;
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Picture>>
    {
        public async Task<List<Picture>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Pictures.ToListAsync();
        }
    }
}
