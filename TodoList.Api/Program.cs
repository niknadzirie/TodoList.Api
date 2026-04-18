using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.Extensions;
using TodoList.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.DataSeeding();

var app = builder.Build();

app.MigrateDb();

app.MapGet("/", () => "Test Running The Initial Project Creation");

app.Run();
