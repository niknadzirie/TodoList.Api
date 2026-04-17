using System;

namespace TodoList.Api.Models;

public class Status
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<TodoTask> TodoTasks { get; set; }
}
