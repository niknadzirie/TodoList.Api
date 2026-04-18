using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Endpoints;
using TodoList.Api.Extensions;
using TodoList.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.DataSeeding();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MigrateDb();

app.MapStatusEndpoints();
app.MapTodoTaskEndpoints();

app.Run();
