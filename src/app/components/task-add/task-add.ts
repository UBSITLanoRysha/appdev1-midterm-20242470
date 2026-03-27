import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-7">
        <div class="task-card p-4">
          <h3 class="mb-4" style="color: var(--purple-dark);">Add New Task</h3>

          <div *ngIf="showError" class="alert alert-danger">
            ⚠️ Please fill in all required fields.
          </div>
          <div *ngIf="showSuccess" class="alert alert-success">
            ✅ Task added! Redirecting...
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Title <span class="text-danger">*</span></label>
            <input type="text" class="form-control" [(ngModel)]="title" placeholder="Enter task title">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Description <span class="text-danger">*</span></label>
            <textarea class="form-control" [(ngModel)]="description" rows="3" placeholder="Describe the task"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Due Date <span class="text-danger">*</span></label>
            <input type="date" class="form-control" [(ngModel)]="dueDate">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Priority</label>
            <select class="form-select" [(ngModel)]="priority">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="form-label fw-semibold">Status</label>
            <select class="form-select" [(ngModel)]="status">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-primary px-4" (click)="submit()">Add Task</button>
            <a routerLink="/tasks" class="btn btn-outline-secondary">Cancel</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskAddComponent {
  title = '';
  description = '';
  dueDate = '';
  priority: 'Low' | 'Medium' | 'High' = 'Medium';
  status: 'Pending' | 'In Progress' | 'Completed' = 'Pending';
  showError = false;
  showSuccess = false;

  constructor(private taskService: TaskService, private router: Router) {}

  submit() {
    if (!this.title.trim() || !this.description.trim() || !this.dueDate) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.taskService.addTask({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status
    });
    this.showSuccess = true;
    setTimeout(() => this.router.navigate(['/tasks']), 1200);
  }
}