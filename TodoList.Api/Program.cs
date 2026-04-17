using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbcontext>(option =>
    {
        option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
        option
        .UseAsyncSeeding(async (context, _, cancellationToken) =>
        {
            if (!await context.Set<Status>().AnyAsync(cancellationToken))
            {
                var status1 = new Status { Id = Guid.NewGuid(), Name = "To Do" };
                var status2 = new Status { Id = Guid.NewGuid(), Name = "In Progress" };
                var status3 = new Status { Id = Guid.NewGuid(), Name = "Done" };

                await context.Set<Status>().AddRangeAsync([status1, status2, status3], cancellationToken);
                await context.SaveChangesAsync(cancellationToken);
            }
        })
        .UseSeeding((context, _) =>
        {
            if (!context.Set<Status>().Any())
            {
                var status1 = new Status { Id = Guid.NewGuid(), Name = "To Do" };
                var status2 = new Status { Id = Guid.NewGuid(), Name = "In Progress" };
                var status3 = new Status { Id = Guid.NewGuid(), Name = "Done" };

                context.Set<Status>().AddRange(status1, status2, status3);
                context.SaveChanges();
            }
        });
    });

var app = builder.Build();

using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<AppDbcontext>();
dbContext.Database.Migrate();

app.MapGet("/", () => "Test Running The Initial Project Creation");

app.Run();
