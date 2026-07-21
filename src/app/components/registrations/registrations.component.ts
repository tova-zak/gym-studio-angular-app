import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { Registration } from '../../models/registration.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [AgGridModule, CommonModule],
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  rowData: Registration[] = [];
  allRowData: Registration[] = [];
  private gridApi?: GridApi;

  defaultColDef: ColDef = {
    floatingFilter: false,
    resizable: true,
    icons: {
      menu: '🔍'
    }
  };

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

  colDefs: ColDef[] = [
    {
      field: 'firstName',
      headerName: 'שם פרטי',
      flex: 1,
      filter: true
    },
    {
      field: 'lastName',
      headerName: 'שם משפחה',
      flex: 1,
      filter: true
    },
    {
      field: 'phone',
      headerName: 'טלפון',
      flex: 1,
      filter: true
    },
    {
      field: 'idNumber',
      headerName: 'מספר זהות',
      flex: 1,
      filter: true
    },
    {
      field: 'lesson',
      headerName: 'שיעור',
      flex: 1,
      filter: true
    },
    {
      field: 'price',
      headerName: 'מחיר',
      flex: 1,
      filter: true
    },
    {
      field: 'isPaid',
      headerName: 'שולם',
      flex: 1,
      filter: true,
      valueFormatter: params => params.value ? 'שולם' : 'לא שולם'
    },
    {
      headerName: 'פרטים',
      field: 'details',
      cellRenderer: () => '<button>הצג פרטים</button>',
      onCellClicked: (params) => this.showDetails(params.data)
    }
  ];

  rowClassRules = {
    'row-unpaid': (params: any) => params?.data?.isPaid === false
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.allRowData = this.dataService.getRegistrations();
    this.rowData = [...this.allRowData];
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

  showDetails(data: Registration) {
    const details = `
      שם פרטי: ${data.firstName}
      שם משפחה: ${data.lastName}
      טלפון: ${data.phone}
      מספר זהות: ${data.idNumber}
      שיעור: ${data.lesson}
      מחיר: ${data.price}
      שולם: ${data.isPaid ? 'כן' : 'לא'}
    `;
    alert(details);
  }
}
