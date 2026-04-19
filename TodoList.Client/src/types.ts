export interface TodoTaskResponseDto {
  id: string;
  title: string;
  description: string;
  dateLine: string; // ISO date string (YYYY-MM-DD)
  isCompleted: boolean;
  statusName: string;
}

export interface CreateTodoTaskDto {
  title: string;
  description: string;
  dateLine: string; // ISO date string (YYYY-MM-DD)
  statusId: number;
  isCompleted: boolean;
}

export interface Status {
  id: number;
  name: string;
}
