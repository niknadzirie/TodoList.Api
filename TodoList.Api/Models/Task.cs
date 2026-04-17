using System;

namespace TodoList.Api.Models;

public class TodoTask
{
    public Guid Id { get; set; }
    public Guid StatusId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Status Status { get; set; }
    public DateOnly DateLine { get; set; }
    public bool IsCompleted { get; set; }
}
