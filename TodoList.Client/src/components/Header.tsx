import React from 'react';
import { Button } from './Button';
import '../styles/Header.css';

interface HeaderProps {
  taskCount: number;
  completedCount: number;
  onAddTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  taskCount,
  completedCount,
  onAddTask,
}) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div>
            <h1 className="header__title">📋 Task Manager</h1>
            <p className="header__subtitle">
              {completedCount} of {taskCount} tasks completed
            </p>
          </div>
          <Button onClick={onAddTask} size="lg">
            + New Task
          </Button>
        </div>

        <div className="header__progress">
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{
                width: taskCount > 0 ? `${(completedCount / taskCount) * 100}%` : '0%',
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};
