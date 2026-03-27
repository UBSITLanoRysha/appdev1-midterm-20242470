import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div *ngIf="task; else notFound">
      <div class="task-card overflow-hidden mb-3">

        <div class="p-4 d-flex justify-content-between align-items-center"
          style="background-color: var(--purple-main);">
          <h4 class="mb-0 text-white">{{ task.title }}</h4>
          <span [ngClass]="statusClass(task.status)">{{ task.status }}</span>
        </div>

        <div class="p-4">
          <ul class="nav nav-pills mb-4">
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['info']" routerLinkActive="active">📋 Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['edit']" routerLinkActive="active">✏️ Edit</a>
            </li>
          </ul>
          <router-outlet></router-outlet>
        </div>

      </div>
      <a routerLink="/tasks" class="btn btn-outline-primary">← Back to Tasks</a>
    </div>

    <ng-template #notFound>
      <div class="alert alert-danger">❌ Task not found. The ID does not exist.</div>
      <a routerLink="/tasks" class="btn btn-primary">← Back to Tasks</a>
    </ng-template>
  `
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
  }

  statusClass(status: string) {
    return {
      'badge-pending': status === 'Pending',
      'badge-inprogress': status === 'In Progress',
      'badge-completed': status === 'Completed'
    };
  }
}