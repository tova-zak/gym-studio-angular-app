import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // נדרש בשביל ngFor
import { LessonsService } from '../../services/lessons.service';
import { LessonDetailsComponent } from '../lesson-details/lesson-details.component'; // ייבוא הקומפוננטה הבן

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [CommonModule, LessonDetailsComponent], 
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
  lessons: any[] = [];

  constructor(private lessonsService: LessonsService, private router: Router) {}

  ngOnInit() {
    // `lessons` is a signal in LessonsService, call it to get the current value
    this.lessons = this.lessonsService.lessons();
  }

  goHome(): void {
    this.router.navigate(['/login']);
  }

  goToLessonsTable(): void {
    this.router.navigate(['/lessons-table']);
  }
}