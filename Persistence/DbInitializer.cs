using System;
using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context) {
        if(context.Pictures.Any())
            return;
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), "..", "public", "images");
        string[] files = Directory.GetFiles(filePath);

        List<Picture> ps = new List<Picture>();
        foreach(string file in files) {
            ps.Add(new() {
                FilePath = file
            });
        }

        await context.Pictures.AddRangeAsync(ps);
        await context.SaveChangesAsync();
    }
}
