import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div *ngIf="task">
      <div class="mb-3">
        <label class="form-label fw-semibold">Title</label>
        <input type="text" class="form-control" [(ngModel)]="task.title">
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Description</label>
        <textarea class="form-control" [(ngModel)]="task.description" rows="3"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Due Date</label>
        <input type="date" class="form-control" [(ngModel)]="task.dueDate">
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Priority</label>
        <select class="form-select" [(ngModel)]="task.priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="form-label fw-semibold">Status</label>
        <select class="form-select" [(ngModel)]="task.status">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button class="btn btn-primary px-4" (click)="save()">💾 Save Changes</button>
    </div>

    <div *ngIf="!task" class="alert alert-warning">Task not found.</div>
  `
})
export class TaskEditComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const found = this.taskService.getTaskById(id);
    if (found) this.task = { ...found };
  }

  save() {
    if (this.task) {
      this.taskService.updateTask(this.task);
      this.router.navigate(['/tasks', this.task.id, 'info']);
    }
  }
}