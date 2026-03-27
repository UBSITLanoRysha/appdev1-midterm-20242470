import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="task">
      <div class="row g-4">
        <div class="col-12">
          <p class="text-muted mb-1 small text-uppercase fw-semibold">Description</p>
          <p class="fs-6">{{ task.description }}</p>
        </div>
        <div class="col-md-4">
          <p class="text-muted mb-1 small text-uppercase fw-semibold">Due Date</p>
          <p class="fw-semibold">{{ task.dueDate }}</p>
        </div>
        <div class="col-md-4">
          <p class="text-muted mb-1 small text-uppercase fw-semibold">Priority</p>
          <span [ngClass]="priorityClass(task.priority)">{{ task.priority }}</span>
        </div>
        <div class="col-md-4">
          <p class="text-muted mb-1 small text-uppercase fw-semibold">Status</p>
          <span [ngClass]="statusClass(task.status)">{{ task.status }}</span>
        </div>
      </div>
    </div>
  `
})
export class TaskInfoComponent implements OnInit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
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