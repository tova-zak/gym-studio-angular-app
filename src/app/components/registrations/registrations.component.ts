import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { Registration } from '../../models/registration.model';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [AgGridModule, CommonModule, CustomHeaderComponent],
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  rowData: Registration[] = [];
  allRowData: Registration[] = [];
  filters: Record<string, string | number | boolean | null> = {};
  components = { customHeader: CustomHeaderComponent };
  private gridApi?: GridApi;
  private resetToken = 0;

  colDefs: ColDef[] = [
    {
      field: 'firstName',
      headerName: 'שם פרטי',
      flex: 1,
      headerComponent: 'customHeader',
      headerComponentParams: {
        field: 'firstName',
        columnName: 'שם פרטי',
        filterType: 'text',
        onFilterChange: (field: string, value: string | number | boolean | null) => this.applyFilter(field, value)
      }
    },
    {
      field: 'lastName',
      headerName: 'שם משפחה',
      flex: 1,
      headerComponent: 'customHeader',
      headerComponentParams: {
        field: 'lastName',
        columnName: 'שם משפחה',
        filterType: 'text',
        onFilterChange: (field: string, value: string | number | boolean | null) => this.applyFilter(field, value)
      }
    },
    {
      field: 'phone',
      headerName: 'טלפון',
      flex: 1,
      headerComponent: 'customHeader',
      headerComponentParams: {
        field: 'phone',
        columnName: 'טלפון',
        filterType: 'text',
        onFilterChange: (field: string, value: string | number | boolean | null) => this.applyFilter(field, value)
      }
    },
    {
      field: 'idNumber',
      headerName: 'מספר זהות',
      flex: 1,
      headerComponent: 'customHeader',
      headerComponentParams: {
        field: 'idNumber',
        columnName: 'מספר זהות',
        filterType: 'text',
        onFilterChange: (field: string, value: string | number | boolean | null) => this.applyFilter(field, value)
      }
    },
    {
      field: 'lesson',
      headerName: 'שיעור',
      flex: 1,
      headerComponent: 'customHeader',
      headerComponentParams: {
        field: 'lesson',
        columnName: 'שיעור',
        filterType: 'text',
        onFilterChange: (field: string, value: string | number | boolean | null) => this.applyFilter(field, value)
      }
    },
    {
      field: 'price',
      headerName: 'מחיר',
      flex: 1,
      headerComponent: 'customHeader',
      headerComponentParams: {
        field: 'price',
        columnName: 'מחיר',
        filterType: 'number',
        onFilterChange: (field: string, value: string | number | boolean | null) => this.applyFilter(field, value)
      }
    },
    {
      field: 'isPaid',
      headerName: 'שולם',
      flex: 1,
      headerComponent: 'customHeader',
      headerComponentParams: {
        field: 'isPaid',
        columnName: 'שולם',
        filterType: 'boolean',
        onFilterChange: (field: string, value: string | number | boolean | null) => this.applyFilter(field, value)
      },
      valueFormatter: params => params.value ? 'שולם' : 'לא שולם'
    },
    {
      headerName: 'פרטים',
      cellRenderer: () => '<button>הצג פרטים</button>',
      onCellClicked: (params) => this.showDetails(params.data)
    }
  ];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.allRowData = this.dataService.getRegistrations();
    this.rowData = [...this.allRowData];
  }

  applyFilter(field: string, value: string | number | boolean | null): void {
    if (value === null || value === '') {
      delete this.filters[field];
    } else {
      this.filters[field] = value;
    }

    this.rowData = this.allRowData.filter((item) => this.matchesFilters(item));
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }

  clearAllFilters(): void {
    this.filters = {};
    this.rowData = [...this.allRowData];
    this.resetToken += 1;
    this.colDefs.forEach(col => {
      if (col.headerComponentParams) {
        (col.headerComponentParams as any).resetToken = this.resetToken;
      }
    });
    this.gridApi?.refreshHeader();
  }

  goHome(): void {
    this.router.navigate(['/login']);
  }

  private matchesFilters(item: Registration): boolean {
    return Object.entries(this.filters).every(([field, filterValue]) => {
      if (filterValue === null || filterValue === '') {
        return true;
      }

      const currentValue = item[field as keyof Registration];

      if (field === 'price') {
        return Number(currentValue) === Number(filterValue);
      }

      if (field === 'isPaid') {
        return Boolean(currentValue) === Boolean(filterValue);
      }

      if (field === 'phone') {
        const numericCurrent = String(currentValue).replace(/\D/g, '');
        const numericFilter = String(filterValue).replace(/\D/g, '');
        return numericCurrent.includes(numericFilter);
      }

      return String(currentValue).toLowerCase().includes(String(filterValue).toLowerCase());
    });
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
