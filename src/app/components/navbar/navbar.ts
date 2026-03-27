import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg" style="background-color: #4a2070;">
      <div class="container">
        <a class="navbar-brand brand-title text-white fw-bold fs-4" routerLink="/tasks">
          ✦ TaskFlow
        </a>
        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navMenu"
          aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation"
          style="border-color: rgba(255,255,255,0.4);">
          <span class="navbar-toggler-icon" style="filter: invert(1);"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto gap-2">
            <li class="nav-item">
              <a class="nav-link text-white px-3 py-2 rounded"
                routerLink="/tasks"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{exact: true}">
                All Tasks
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white px-3 py-2 rounded"
                routerLink="/tasks/new"
                routerLinkActive="active-link">
                + New Task
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}