import { Component, Input } from '@angular/core'; // הוספנו את Input
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.css']
})
export class LessonDetailsComponent {
  @Input() lesson: any; 
  
  isStarted(): boolean {
    if (!this.lesson || !this.lesson.startDate) return false;
    const start = new Date(this.lesson.startDate).getTime();
    return start <= Date.now();
  }
}