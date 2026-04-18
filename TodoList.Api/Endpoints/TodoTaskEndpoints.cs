using System;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Dtos;
using TodoList.Api.Models;
using TodoList.Api.Models.Dtos;

namespace TodoList.Api.Endpoints;

public static class TodoTaskEndpoints
{
    public static void MapTodoTaskEndpoints(this WebApplication app)
    {
        //GET all tasks
        app.MapGet("/tasks", async (AppDbcontext context) =>
        {
            var tasks = await context.TodoTasks
            .Include(t => t.Status)
            .Select(t => new TodoTaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DateLine = t.DateLine,
                IsCompleted = t.IsCompleted,
                StatusName = t.Status.Name
            })
            .ToListAsync();
            return Results.Ok(tasks);
        });

        //GET task by Id

        //Post task
        app.MapPost("/tasks", async (AppDbcontext context, CreateTodoTaskDto dto) =>
        {
            var todoTask = new TodoTask
            {
                Title = dto.Title,
                Description = dto.Description,
                DateLine = dto.DateLine,
                StatusId = dto.StatusId,
                IsCompleted = dto.IsCompleted
            };

            context.TodoTasks.Add(todoTask);
            await context.SaveChangesAsync();

            var response = await context.TodoTasks
            .Include(t => t.Status)
            .Where(t => t.Id == todoTask.Id)
            .Select(t => new TodoTaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DateLine = t.DateLine,
                IsCompleted = t.IsCompleted,
                StatusName = t.Status.Name
            })
            .FirstAsync();

            return Results.Created($"/tasks/{response.Id}", response);
        });
    }
}
