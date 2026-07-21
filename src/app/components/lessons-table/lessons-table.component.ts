import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lessons-table',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
    <div class="page-wrapper">
      <div class="bg-icon bg-anim-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </div>
      <div class="bg-icon bg-anim-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-2-2h-1"></path><path d="M3 8v8a2 2 0 0 0 2 2h1"></path><rect x="6" y="2" width="12" height="6" rx="3"></rect></svg>
      </div>
      <div class="bg-icon bg-anim-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </div>
      <div class="bg-icon bg-anim-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><path d="M12 11a4 4 0 0 0 0-8"></path></svg>
      </div>

      <div class="page-panel">
        <div class="page-header">
          <div>
            <h1>טבלת השעורים</h1>
            <p class="page-subtitle">שעורי סטודיו</p>
          </div>
          <div class="actions-row">
            <button type="button" class="nav-button" (click)="goHome()">חזרה לדף הבית</button>
            <button type="button" class="nav-button" (click)="goToLessonsList()">לוח השעורים</button>
            <button type="button" class="nav-button secondary" (click)="clearAllFilters()">נקה את כל הסינונים</button>
          </div>
        </div>

        <div class="table-container">
          <div class="ag-theme-alpine" style="width: 100%; height: 520px;">
            <ag-grid-angular
              style="width: 100%; height: 100%;"
              [rowData]="rowData"
              [columnDefs]="columnDefs"
              [defaultColDef]="defaultColDef"
              [localeText]="localeText"
              [enableRtl]="true"
              [pagination]="true"
              (gridReady)="onGridReady($event)">
            </ag-grid-angular>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    ".page-wrapper { min-height: 100vh; padding: 20px; display: flex; justify-content: center; align-items: center; position: relative; background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.06), transparent 8%), radial-gradient(circle at 90% 90%, rgba(255,255,255,0.04), transparent 10%), linear-gradient(135deg, #8FE99A 0%, #68DF4F 50%, #3F8B36 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; }",
    ".bg-icon { position: absolute; width: 72px; height: 72px; opacity: 1; z-index: 1; color: rgba(255,255,255,0.34); }",
    ".bg-icon svg { width:100%; height:100%; stroke:currentColor; fill:currentColor; stroke-width:2; }",
    ".bg-anim-1 { top: 10%; left: 8%; animation: floatX 8s ease-in-out infinite; }",
    ".bg-anim-2 { top: 30%; right: 6%; animation: floatY 10s ease-in-out infinite; }",
    ".bg-anim-3 { bottom: 12%; left: 20%; animation: floatX 12s ease-in-out infinite; }",
    ".bg-anim-4 { bottom: 18%; right: 18%; animation: floatY 9s ease-in-out infinite; }",
    ".page-panel { width: min(1100px, 100%); background: rgba(255,255,255,0.96); border-radius: 26px; box-shadow: 0 24px 70px rgba(0,0,0,0.16); padding: 40px; position: relative; z-index: 2; }",
    ".page-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; direction: rtl; }",
    ".page-header h1 { margin: 0; font-size: 28px; color: #2E7D32; }",
    ".page-subtitle { margin: 6px 0 0; color: #6aae6a; font-size: 14px; }",
    ".actions-row { display: flex; gap: 12px; flex-wrap: wrap; direction: ltr; }",
    ".nav-button { padding: 12px 22px; border: none; border-radius: 12px; background: linear-gradient(135deg, #6FD388 0%, #4A9F6D 100%); color: white; font-weight: 700; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 6px 18px rgba(106, 200, 136, 0.25); }",
    ".nav-button.secondary { background: rgba(255,255,255,0.95); color: #2E7D32; border: 1px solid rgba(74, 159, 109, 0.18); }",
    ".nav-button:hover { transform: translateY(-1px); background: linear-gradient(135deg, #7FDB98 0%, #5CB896 100%); }",
    ".nav-button.secondary:hover { background: rgba(255,255,255,1); }",
    ".table-container { height: 520px; width: 100%; border-radius: 22px; overflow: hidden; background: white; border: 1px solid rgba(116, 194, 138, 0.18); }",
    ".ag-theme-alpine { height: 100%; border-radius: 22px; }",
    ".ag-header-cell { background: #f5fbf7 !important; color: #2e7d32 !important; font-weight: 700; }",
    ".ag-cell { color: #2f6339 !important; }",
    ".ag-row:nth-child(odd) { background: rgba(98, 175, 100, 0.05) !important; }",
    ".ag-theme-alpine .ag-header-cell-menu-button, .ag-theme-alpine .ag-header-cell-menu-button * { opacity: 1 !important; visibility: visible !important; display: inline-flex !important; justify-content: center !important; align-items: center !important; }",
    ".ag-theme-alpine .ag-header-cell-menu-button { width: 28px !important; height: 28px !important; min-width: 28px !important; padding: 0 !important; margin: 0 !important; }",
    ".ag-theme-alpine .ag-header-cell-menu-button .ag-icon, .ag-theme-alpine .ag-header-cell-menu-button svg, .ag-theme-alpine .ag-header-cell-menu-button .ag-icon-menu, .ag-theme-alpine .ag-header-cell-menu-button .ag-icon-menu svg { display: none !important; }",
    ".ag-theme-alpine .ag-header-cell-menu-button::after { content: '🔍'; font-size: 16px !important; color: #2e7d32 !important; line-height: 1 !important; }",
    ".ag-theme-alpine .ag-header-cell-menu-button:hover { opacity: 1 !important; }",
    "@keyframes floatX { 0% { transform: translateX(0) translateY(0) rotate(0deg); } 50% { transform: translateX(18px) translateY(-10px) rotate(8deg); } 100% { transform: translateX(0) translateY(0) rotate(0deg); } }",
    "@keyframes floatY { 0% { transform: translateY(0) translateX(0) rotate(0deg); } 50% { transform: translateY(20px) translateX(6px) rotate(-6deg); } 100% { transform: translateY(0) translateX(0) rotate(0deg); } }",
    "@media (max-width: 840px) { .page-panel { padding: 28px; } .page-header { flex-direction: column; align-items: stretch; } .nav-button { width: 100%; } }"
  ]
})
export class LessonsTableComponent {
  localeText = {
    contains: 'מכיל',
    notContains: 'לא מכיל',
    equals: 'שווה',
    notEqual: 'לא שווה',
    startsWith: 'מתחיל ב',
    endsWith: 'מסתיים ב',
    blank: 'ריק',
    notBlank: 'לא ריק',
    applyFilter: 'החל',
    clearFilter: 'נקה',
    resetFilter: 'אפס',
    filterOoo: '...סנן',
    loadingOoo: 'טוען...',
    page: 'עמוד',
    more: 'עוד',
    less: 'פחות',
    previous: 'הקודם',
    next: 'הבא',
    of: 'מתוך',
    to: 'ל',
    noRowsToShow: 'אין תוצאות להצגה'
  };

  columnDefs = [
    { field: 'name', headerName: 'קורס', flex: 1, filter: true },
    { field: 'teacherName', headerName: 'מורה', flex: 1, filter: true },
    { field: 'sessionsCount', headerName: 'מפגשים', flex: 1, filter: true },
    { field: 'startDate', headerName: 'התחלה', flex: 1, filter: true, valueFormatter: (p: any) => new Date(p.value).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { field: 'price', headerName: 'מחיר', flex: 1, filter: true },
    { field: 'day', headerName: 'יום', flex: 1, filter: true },
    { field: 'time', headerName: 'זמן', flex: 1, filter: true }
  ];

  defaultColDef = { sortable: true, filter: true, resizable: true, icons: { menu: '🔍' } };
  private gridApi?: GridApi;

  rowData: any[] = [];

  constructor(private lessonsService: LessonsService, private router: Router) {
    this.rowData = this.lessonsService.lessons();
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }

  clearAllFilters(): void {
    this.gridApi?.setFilterModel(null);
    this.gridApi?.onFilterChanged();
  }

  goHome(): void {
    this.router.navigate(['/login']);
  }

  goToLessonsList(): void {
    this.router.navigate(['/lessons']);
  }
}
