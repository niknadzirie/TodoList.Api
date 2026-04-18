using System;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;

namespace TodoList.Api.Endpoints;

public static class TodoTaskEndpoints
{
    public static void MapTodoTaskEndpoints(this WebApplication app)
    {
        app.MapGet("/tasks", async (AppDbcontext context) =>
        {
            var tasks = await context.TodoTasks.Include(t => t.Status).ToListAsync();
            return Results.Ok(tasks);
        });
    }
}
