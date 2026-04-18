using System;

namespace TodoList.Api.Models.Dtos;

public class TodoTaskResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateOnly DateLine { get; set; }
    public bool IsCompleted { get; set; }
    public string StatusName { get; set; } = string.Empty;

}
