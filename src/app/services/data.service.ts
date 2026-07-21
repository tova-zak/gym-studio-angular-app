import { Injectable } from '@angular/core';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mock data for the lessons
  private lessons = [
    { id: 1, name: 'יוגה', teacher: 'שרה', sessions: 10, startDate: '2026-07-01', price: 500, day: 'ראשון', time: '09:00' },
    { id: 2, name: 'פילאטיס', teacher: 'רבקה', sessions: 8, startDate: '2026-06-01', price: 400, day: 'שני', time: '17:00' }
  ];

  private registrations: Registration[] = [
  { firstName: 'חיה', lastName: 'כהן', phone: '050-1111111', idNumber: '012345678', lesson: 'פילאטיס', price: 250, isPaid: true },
  { firstName: 'רבקה', lastName: 'לוי', phone: '052-2222222', idNumber: '012345679', lesson: 'יוגה', price: 200, isPaid: false },
  { firstName: 'שרה', lastName: 'יעקובוביץ', phone: '053-3333333', idNumber: '012345680', lesson: 'אירובי', price: 180, isPaid: true },
  { firstName: 'לאה', lastName: 'רוזנצוויג', phone: '054-4444444', idNumber: '012345681', lesson: 'עיצוב', price: 220, isPaid: true },
  { firstName: 'רחל', lastName: 'גולדמן', phone: '055-5555555', idNumber: '012345682', lesson: 'פילאטיס', price: 250, isPaid: false },
  { firstName: 'מרים', lastName: 'וייס', phone: '058-6666666', idNumber: '012345683', lesson: 'יוגה', price: 200, isPaid: true },
  { firstName: 'אסתר', lastName: 'קליין', phone: '050-7777777', idNumber: '012345684', lesson: 'אירובי', price: 180, isPaid: true },
  { firstName: 'יעלה', lastName: 'פרידמן', phone: '052-8888888', idNumber: '012345685', lesson: 'עיצוב', price: 220, isPaid: false },
  { firstName: 'הדסה', lastName: 'ברקוביץ', phone: '053-9999999', idNumber: '012345686', lesson: 'פילאטיס', price: 250, isPaid: true },
  { firstName: 'שיינא', lastName: 'פישר', phone: '054-0000000', idNumber: '012345687', lesson: 'יוגה', price: 200, isPaid: true },
  { firstName: 'מלכה', lastName: 'שוורץ', phone: '055-1112223', idNumber: '012345688', lesson: 'אירובי', price: 180, isPaid: false },
  { firstName: 'דבורה', lastName: 'גרין', phone: '058-3334445', idNumber: '012345689', lesson: 'עיצוב', price: 220, isPaid: true },
  { firstName: 'ברכה', lastName: 'מילר', phone: '050-5556667', idNumber: '012345690', lesson: 'פילאטיס', price: 250, isPaid: true },
  { firstName: 'פייגי', lastName: 'פינקלשטיין', phone: '052-7778889', idNumber: '012345691', lesson: 'יוגה', price: 200, isPaid: false },
  { firstName: 'רייזי', lastName: 'לוין', phone: '053-9990001', idNumber: '012345692', lesson: 'אירובי', price: 180, isPaid: true },
  { firstName: 'חני', lastName: 'זלצמן', phone: '054-2223334', idNumber: '012345693', lesson: 'עיצוב', price: 220, isPaid: true },
  { firstName: 'שירה', lastName: 'אדלר', phone: '055-4445556', idNumber: '012345694', lesson: 'פילאטיס', price: 250, isPaid: false },
  { firstName: 'מיכל', lastName: 'שטרן', phone: '058-6667778', idNumber: '012345695', lesson: 'יוגה', price: 200, isPaid: true },
  { firstName: 'חנה', lastName: 'הופמן', phone: '050-8889990', idNumber: '012345696', lesson: 'אירובי', price: 180, isPaid: true },
  { firstName: 'גיטי', lastName: 'בלום', phone: '052-1113335', idNumber: '012345697', lesson: 'עיצוב', price: 220, isPaid: true }
];

  constructor() { }

  // Method to get all lessons
  getLessons() {
    return this.lessons;
  }
  getRegistrations() {
  return this.registrations;
}
}