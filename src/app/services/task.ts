import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks: Task[] = [
    {
      id: 1,
      title: 'Design UI Mockups',
      description: 'Create wireframes for the TaskFlow application.',
      dueDate: '2025-02-10',
      status: 'Completed',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Set Up Angular Project',
      description: 'Scaffold the Angular v21 project with routing and standalone components.',
      dueDate: '2025-02-12',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      description: 'Write tests for all service methods and components.',
      dueDate: '2025-02-20',
      status: 'Pending',
      priority: 'Low'
    }
  ];

  private nextId = 4;

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.tasks.push({ ...task, id: this.nextId++ });
  }

  updateTask(updated: Task): void {
    const index = this.tasks.findIndex(t => t.id === updated.id);
    if (index !== -1) this.tasks[index] = { ...updated };
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleStatus(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    }
  }
}