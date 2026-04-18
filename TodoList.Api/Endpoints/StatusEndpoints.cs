using System;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;

namespace TodoList.Api.Endpoints;

public static class StatusEndpoints
{
    public static void MapStatusEndpoints(this WebApplication app)
    {
        app.MapGet("/statuses", async (AppDbcontext context) =>
        {
            var status = await context.Statuses.Include(s => s.TodoTasks).ToListAsync();
            return Results.Ok(status);
        });
    }
}
