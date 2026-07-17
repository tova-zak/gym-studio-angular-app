import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lessons-table',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
    <div class="page-header">
      <h2>טבלת השעורים</h2>
      <div class="actions-row">
        <button type="button" class="nav-button" (click)="goHome()">חזרה לדף הבית</button>
        <button type="button" class="nav-button" (click)="goToLessonsList()">לוח השעורים</button>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 400px;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef">
    </ag-grid-angular>
  `,
  styles: [
    ".page-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }",
    ".actions-row { display: flex; gap: 10px; flex-wrap: wrap; }",
    ".nav-button { padding: 8px 14px; border: 1px solid #ccc; border-radius: 4px; background: #f7f7f7; cursor: pointer; font-size: 14px; }",
    ".nav-button:hover { background: #eee; }"
  ]
})
export class LessonsTableComponent {
  columnDefs = [
    { field: 'name', headerName: 'Name' },
    { field: 'teacherName', headerName: 'Teacher' },
    { field: 'sessionsCount', headerName: 'Sessions' },
    { field: 'startDate', headerName: 'Start', valueFormatter: (p:any) => new Date(p.value).toLocaleDateString() },
    { field: 'price', headerName: 'Price' },
    { field: 'day', headerName: 'Day' },
    { field: 'time', headerName: 'Time' }
  ];

  defaultColDef = { sortable: true, filter: true, resizable: true };

  rowData: any[] = [];

  constructor(private lessonsService: LessonsService, private router: Router) {
    this.rowData = this.lessonsService.lessons();
  }

  goHome(): void {
    this.router.navigate(['/login']);
  }

  goToLessonsList(): void {
    this.router.navigate(['/lessons']);
  }
}
