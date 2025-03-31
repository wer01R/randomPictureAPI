using Application.Pictures.Command;
using Application.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddMediatR(x => 
    x.RegisterServicesFromAssemblyContaining<UpdatePictures.Command>());

builder.Services.AddDbContext<AppDbContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

builder.WebHost.ConfigureKestrel(options => {
    options.Limits.MaxRequestBodySize = (long)Math.Pow(2, 32);
});

var app = builder.Build();

app.MapControllers();
app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader()
    .WithOrigins("http://localhost:5000", "http://localhost:3000", "https://localhost:3000"));

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try {
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
} catch (Exception err) {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError("An error happened" + err.ToString());
}

app.Run();
