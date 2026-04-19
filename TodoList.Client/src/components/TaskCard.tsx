import React from 'react';
import type { TodoTaskResponseDto } from '../types';
import { Button } from './Button';
import '../styles/TaskCard.css';

interface TaskCardProps {
  task: TodoTaskResponseDto;
  onEdit: (task: TodoTaskResponseDto) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (task: TodoTaskResponseDto) => void;
  isDeleting?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  isDeleting = false,
}) => {
  const isOverdue =
    new Date(task.dateLine) < new Date() && !task.isCompleted;
  const isToday = new Date(task.dateLine).toDateString() === new Date().toDateString();

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className={`task-card ${task.isCompleted ? 'task-card--completed' : ''}`}>
      <div className="task-card__checkbox">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task)}
          className="task-card__input"
        />
      </div>

      <div className="task-card__content">
        <h3 className="task-card__title">{task.title}</h3>
        {task.description && <p className="task-card__description">{task.description}</p>}
        
        <div className="task-card__footer">
          <span className={`task-card__status ${task.statusName.toLowerCase()}`}>
            {task.statusName}
          </span>
          <span className={`task-card__date ${isOverdue ? 'overdue' : isToday ? 'today' : ''}`}>
            {isOverdue && '⚠️ '}{isToday && '📅 '}{formatDate(task.dateLine)}
          </span>
        </div>
      </div>

      <div className="task-card__actions">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✎
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(task.id)}
          isLoading={isDeleting}
          title="Delete task"
        >
          ✕
        </Button>
      </div>
    </div>
  );
};
