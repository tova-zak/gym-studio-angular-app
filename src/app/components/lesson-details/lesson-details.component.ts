import { Component, Input } from '@angular/core'; // הוספנו את Input
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css'
})
export class LessonDetailsComponent {
  @Input() lesson: any; // זו השורה שחסרה לך - היא מאפשרת להעביר את הנתונים
}