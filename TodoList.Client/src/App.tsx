import { useState, useEffect } from 'react';
import {
  Header,
  TaskCard,
  TaskForm,
  Modal,
  EmptyState,
} from './components';
import { api } from './services/api';
import type { TodoTaskResponseDto, Status } from './types';
import './styles/App.css';
import './index.css';

function App() {
  const [tasks, setTasks] = useState<TodoTaskResponseDto[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TodoTaskResponseDto | undefined>();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [tasksData, statusesData] = await Promise.all([
          api.getTasks(),
          api.getStatuses(),
        ]);
        setTasks(tasksData);
        setStatuses(statusesData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load tasks';
        setError(errorMessage);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: TodoTaskResponseDto) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: {
    title: string;
    description: string;
    dateLine: string;
    statusId: number;
    isCompleted: boolean;
  }) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingTask) {
        // Update task
        const updatedTask = await api.updateTask(editingTask.id, formData);
        setTasks(tasks.map((t) => (t.id === editingTask.id ? updatedTask : t)));
      } else {
        // Create new task
        const newTask = await api.createTask(formData);
        setTasks([...tasks, newTask]);
      }

      setIsModalOpen(false);
      setEditingTask(undefined);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save task';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      setDeletingTaskId(id);
      setError(null);
      await api.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      console.error(err);
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleToggleComplete = async (task: TodoTaskResponseDto) => {
    try {
      setError(null);
      const status = statuses.find((s) => s.name === task.statusName);
      const updatedTask = await api.updateTask(task.id, {
        title: task.title,
        description: task.description,
        dateLine: task.dateLine,
        statusId: status?.id || 1,
        isCompleted: !task.isCompleted,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      console.error(err);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'pending') return !task.isCompleted;
    return true;
  });

  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <div className="app">
      <Header
        taskCount={tasks.length}
        completedCount={completedCount}
        onAddTask={handleAddTask}
      />

      <main className="app__main">
        {error && (
          <div
            style={{
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderLeft: '4px solid #ef4444',
              borderRadius: '0.5rem',
              color: '#ef4444',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <div className="app__filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {isLoading ? (
          <div className="app__loading">
            <div className="app__spinner"></div>
            Loading tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <EmptyState onAddTask={handleAddTask} />
        ) : (
          <div className="tasks-container">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                isDeleting={deletingTaskId === task.id}
              />
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(undefined);
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          statuses={statuses}
          onSubmit={handleFormSubmit}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}

export default App;
