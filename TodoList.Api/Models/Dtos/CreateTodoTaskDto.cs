using System;

namespace TodoList.Api.Dtos;

public class CreateTodoTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateOnly DateLine { get; set; }
    public int StatusId { get; set; }
    public bool IsCompleted { get; set; } = false;
}
