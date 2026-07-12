import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Lesson } from './models/lessons.models';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  template: `
    <mat-card [class.started]="isStarted()">
      <mat-card-header>
        <mat-card-title>{{ lesson.name }}</mat-card-title>
        <mat-card-subtitle>{{ lesson.teacherName }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Sessions: {{ lesson.sessionsCount }}</p>
        <p>Day / Time: {{ lesson.day }}, {{ lesson.time }}</p>
        <p>Start date: {{ lesson.startDate | date:'mediumDate' }}</p>
        <p>Price: {{ lesson.price }}₪</p>
        <p class="started-label" *ngIf="isStarted()">Already started</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { margin: 0.5rem; min-width: 220px; }
    mat-card.started { background-color: #444; color: white; font-weight: bold; }
    .started-label { font-style: italic; }
  `]
})
export class LessonDetailComponent {
  @Input() lesson!: Lesson;

  isStarted(): boolean {
    const start = this.lesson?.startDate ? new Date(this.lesson.startDate).getTime() : Infinity;
    return start <= Date.now();
  }
}
