using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Endpoints;
using TodoList.Api.Extensions;
using TodoList.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.DataSeeding();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS support
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.MigrateDb();

app.MapStatusEndpoints();
app.MapTodoTaskEndpoints();

app.Run();
