import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // נדרש בשביל ngFor
import { DataService } from '../../services/data.service';
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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.lessons = this.dataService.getLessons();
  }
}