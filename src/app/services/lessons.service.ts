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
      name: 'יוגה',
      teacherName: 'שרה כהן',
      sessionsCount: 12,
      startDate: new Date('2026-05-01'),
      price: 450,
      day: 'שני',
      time: '17:00',
    },
    {
      id: 2,
      name: 'פילאטיס',
      teacherName: 'רבקה לוי',
      sessionsCount: 10,
      startDate: new Date('2026-09-01'),
      price: 600,
      day: 'רביעי',
      time: '18:30',
    },
    {
      id: 3,
      name: 'אירובי',
      teacherName: 'נועה לוי',
      sessionsCount: 8,
      startDate: new Date('2026-06-01'), 
      price: 500,
      day: 'ראשון',
      time: '16:00',
    },
  ]);

  lessons = this._lessons.asReadonly();
}
