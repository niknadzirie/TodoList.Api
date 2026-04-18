using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Extensions;
using TodoList.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.DataSeeding();

var app = builder.Build();

app.MigrateDb();

app.MapGet("/status", async (AppDbcontext context) =>
{
    var status = await context.Statuses.Select(s => new {s.Id, s.Name }).ToListAsync();
    return Results.Ok(status);
});

app.Run();
