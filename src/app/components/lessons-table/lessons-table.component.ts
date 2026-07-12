import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lessons-table',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
    <ag-grid-angular
      style="width: 100%; height: 400px;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef">
    </ag-grid-angular>
  `
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

  constructor(private lessonsService: LessonsService) {
    this.rowData = this.lessonsService.lessons();
  }
}
