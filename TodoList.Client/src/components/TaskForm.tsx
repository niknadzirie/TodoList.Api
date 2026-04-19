import React, { useState } from 'react';
import type { TodoTaskResponseDto, Status } from '../types';
import { Button } from './Button';
import '../styles/TaskForm.css';

interface TaskFormProps {
  task?: TodoTaskResponseDto;
  statuses: Status[];
  onSubmit: (data: {
    title: string;
    description: string;
    dateLine: string;
    statusId: number;
    isCompleted: boolean;
  }) => Promise<void>;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  statuses,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dateLine: task?.dateLine || '',
    statusId: task ? statuses.find(s => s.name === task.statusName)?.id || statuses[0]?.id : statuses[0]?.id || 0,
    isCompleted: task?.isCompleted || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.dateLine) newErrors.dateLine = 'Due date is required';
    if (!formData.statusId) newErrors.statusId = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`form-input ${errors.title ? 'form-input--error' : ''}`}
          placeholder="Enter task title"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-textarea"
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateLine">Due Date *</label>
          <input
            id="dateLine"
            type="date"
            value={formData.dateLine}
            onChange={(e) => setFormData({ ...formData, dateLine: e.target.value })}
            className={`form-input ${errors.dateLine ? 'form-input--error' : ''}`}
          />
          {errors.dateLine && <span className="form-error">{errors.dateLine}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="statusId">Status *</label>
          <select
            id="statusId"
            value={formData.statusId}
            onChange={(e) => setFormData({ ...formData, statusId: parseInt(e.target.value) })}
            className={`form-input ${errors.statusId ? 'form-input--error' : ''}`}
          >
            <option value="">Select a status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          {errors.statusId && <span className="form-error">{errors.statusId}</span>}
        </div>
      </div>

      <div className="form-group form-checkbox">
        <input
          id="isCompleted"
          type="checkbox"
          checked={formData.isCompleted}
          onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
          className="form-input"
        />
        <label htmlFor="isCompleted">Mark as completed</label>
      </div>

      <div className="form-actions">
        <Button type="submit" isLoading={isLoading}>
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};
