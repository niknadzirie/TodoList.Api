using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Endpoints;
using TodoList.Api.Extensions;
using TodoList.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.DataSeeding();

var app = builder.Build();

app.MigrateDb();

app.MapStatusEndpoints();
app.MapTodoTaskEndpoints();

app.Run();
