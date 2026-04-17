using System;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Models;

namespace TodoList.Api.Data;

public class AppDbcontext : DbContext
{
    public AppDbcontext(DbContextOptions<AppDbcontext> options) : base(options)
    {
    }
    public DbSet<TodoTask> TodoTasks { get; set; }
    public DbSet<Status> Statuses { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TodoTask>()
            .HasOne(td => td.Status)
            .WithMany(s => s.TodoTasks)
            .HasForeignKey(td => td.StatusId);
    }
    
}
