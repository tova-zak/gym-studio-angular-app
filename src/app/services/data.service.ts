import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mock data for the lessons
  private lessons = [
    { id: 1, name: 'Yoga', teacher: 'Sarah', sessions: 10, startDate: '2026-07-01', price: 500, day: 'Sunday', time: '09:00' },
    { id: 2, name: 'Pilates', teacher: 'Rivki', sessions: 8, startDate: '2026-06-01', price: 400, day: 'Monday', time: '17:00' }
  ];

  constructor() { }

  // Method to get all lessons
  getLessons() {
    return this.lessons;
  }
}