import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LessonsService } from './services/lessons.service';
import { LessonDetailComponent } from './lessons-details.component';

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [MatToolbarModule, LessonDetailComponent],
  template: `
    <mat-toolbar color="primary">Classes</mat-toolbar>

    <div class="gallery">
      @for (lesson of lessons(); track lesson.id) {
        <app-lesson-detail [lesson]="lesson" />
      } @empty {
        <p>No classes to display.</p>
      }
    </div>
  `,
  styles: [`
    .gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
    }
  `]
})
export class LessonsListComponent {
  constructor(private lessonsService: LessonsService) {}

  lessons = this.lessonsService.lessons;
}
