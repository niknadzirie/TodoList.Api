using System;

namespace TodoList.Api.Models;

public class Status
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<TodoTask> TodoTasks { get; set; }
}
