import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0" style="color: var(--purple-dark);">My Tasks</h2>
      <a routerLink="/tasks/new" class="btn btn-primary px-4">+ Add Task</a>
    </div>

    <div class="task-card p-0 overflow-hidden">
      <table class="table table-striped table-hover mb-0 align-middle">
        <thead style="background-color: var(--purple-pale);">
          <tr>
            <th style="color: var(--purple-dark);">Title</th>
            <th style="color: var(--purple-dark);">Due Date</th>
            <th style="color: var(--purple-dark);">Priority</th>
            <th style="color: var(--purple-dark);">Status</th>
            <th style="color: var(--purple-dark);">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of tasks">
            <td class="fw-semibold">{{ task.title }}</td>
            <td>{{ task.dueDate }}</td>
            <td>
              <span [ngClass]="priorityClass(task.priority)">{{ task.priority }}</span>
            </td>
            <td>
              <span [ngClass]="statusClass(task.status)">{{ task.status }}</span>
            </td>
            <td class="d-flex gap-1 flex-wrap">
              <a [routerLink]="['/tasks', task.id]" class="btn btn-sm btn-outline-primary">View</a>
              <button class="btn btn-sm btn-outline-secondary" (click)="toggleStatus(task.id)">Toggle</button>
              <button class="btn btn-sm btn-outline-danger" (click)="deleteTask(task.id)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="tasks.length === 0">
            <td colspan="5" class="text-center text-muted py-5">
              No tasks yet. <a routerLink="/tasks/new">Add one!</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  toggleStatus(id: number) {
    this.taskService.toggleStatus(id);
    this.loadTasks();
  }

  priorityClass(priority: string) {
    return {
      'badge-priority-high': priority === 'High',
      'badge-priority-medium': priority === 'Medium',
      'badge-priority-low': priority === 'Low'
    };
  }

  statusClass(status: string) {
    return {
      'badge-pending': status === 'Pending',
      'badge-inprogress': status === 'In Progress',
      'badge-completed': status === 'Completed'
    };
  }
}