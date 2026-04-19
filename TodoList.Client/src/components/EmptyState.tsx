import React from 'react';
import { Button } from './Button';
import '../styles/EmptyState.css';

interface EmptyStateProps {
  onAddTask: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddTask }) => {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">📭</div>
      <h2 className="empty-state__title">No tasks yet</h2>
      <p className="empty-state__subtitle">
        Create your first task to get started with task management
      </p>
      <Button onClick={onAddTask} size="lg">
        Create First Task
      </Button>
    </div>
  );
};
