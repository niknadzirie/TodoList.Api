const API_BASE_URL = 'http://localhost:5025';

export const api = {
  async getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  async getTaskById(id: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) throw new Error('Failed to fetch task');
    return response.json();
  },

  async createTask(data: {
    title: string;
    description: string;
    dateLine: string;
    statusId: number;
    isCompleted: boolean;
  }) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  async updateTask(
    id: string,
    data: {
      title: string;
      description: string;
      dateLine: string;
      statusId: number;
      isCompleted: boolean;
    }
  ) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  async deleteTask(id: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },

  async getStatuses() {
    const response = await fetch(`${API_BASE_URL}/statuses`);
    if (!response.ok) throw new Error('Failed to fetch statuses');
    return response.json();
  },
};
