import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LessonsListComponent } from './components/lessons-list/lessons-list.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { LessonsTableComponent } from './components/lessons-table/lessons-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'lessons', component: LessonsListComponent },
  { path: 'lessons-table', component: LessonsTableComponent },
  { path: 'registrations', component: RegistrationsComponent }
];