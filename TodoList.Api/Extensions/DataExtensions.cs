using System;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Models;

namespace TodoList.Api.Extensions;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbcontext>();
        dbContext.Database.EnsureCreated();
        dbContext.Database.Migrate();
    }

    public static void DataSeeding(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<AppDbcontext>(option =>
        {
            option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            option
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
    }
}
