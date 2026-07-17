import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { Registration } from '../../models/registration.model';
import { CommonModule } from '@angular/common'; 
import { CustomHeaderComponent } from './custom-header/custom-header.component';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [AgGridModule,CommonModule,CustomHeaderComponent],
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  rowData: Registration[] = [];

  colDefs: ColDef[] = [
    { field: 'firstName', headerName: 'שם פרטי', filter: true, flex: 1 },
    { field: 'lastName', headerName: 'שם משפחה', filter: true, flex: 1 },
    { field: 'phone', headerName: 'טלפון', flex: 1 },
    { field: 'idNumber', headerName: 'מספר זהות', flex: 1 },
    { field: 'lesson', headerName: 'שיעור', filter: true, flex: 1 },
    { field: 'price', headerName: 'מחיר', flex: 1 },
    { 
    field: 'isPaid', 
    headerName: 'שולם', 
    filter: true, 
    flex: 1,
    valueFormatter: params => params.value ? 'שולם' : 'לא שולם' 
  },
    {
      headerName: 'פרטים',
      cellRenderer: () => '<button>הצג פרטים</button>',
      onCellClicked: (params) => this.showDetails(params.data)
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.rowData = this.dataService.getRegistrations();
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