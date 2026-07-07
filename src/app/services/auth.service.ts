import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'teacher1', password: '123', role: 'teacher' },
    { username: 'sec1', password: '456', role: 'secretary' }
  ];

  constructor() { }


  login(username: string, password: string) {
    return this.users.find(u => u.username === username && u.password === password);
  }
}
