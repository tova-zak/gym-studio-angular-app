import { ɵɵdefineInjectable, signal } from '@angular/core';
import { Lesson } from '../models/lessons.models';

export class LessonsService {
  static ɵprov = ɵɵdefineInjectable({
    token: LessonsService,
    providedIn: 'root',
    factory: () => new LessonsService(),
  });

  private readonly _lessons = signal<Lesson[]>([
    {
      id: 1,
      name: 'Beginner Gymnastics',
      teacherName: 'Sara Cohen',
      sessionsCount: 12,
      startDate: new Date('2026-05-01'),
      price: 450,
      day: 'Monday',
      time: '17:00',
    },
    {
      id: 2,
      name: 'Advanced Tumbling',
      teacherName: 'Sara Cohen',
      sessionsCount: 10,
      startDate: new Date('2026-09-01'),
      price: 600,
      day: 'Wednesday',
      time: '18:30',
    },
    {
      id: 3,
      name: 'Rhythmic Gymnastics',
      teacherName: 'Noa Levi',
      sessionsCount: 8,
      startDate: new Date('2026-06-01'), 
      price: 500,
      day: 'Sunday',
      time: '16:00',
    },
  ]);

  lessons = this._lessons.asReadonly();
}
