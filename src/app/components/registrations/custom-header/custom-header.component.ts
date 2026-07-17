import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-header',
  standalone: true,
  template: `
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
      <span>{{ params.displayName }}</span>
      <span title="לחץ לסינון נתונים" style="cursor: pointer; margin-right: 5px;" (click)="toggleFilter($event)">
        🔍
      </span>
    </div>
  `
})
export class CustomHeaderComponent implements IHeaderAngularComp {
  params!: IHeaderParams;

  agInit(params: IHeaderParams): void {
    this.params = params;
  }

  refresh(params: IHeaderParams): boolean {
    this.params = params;
    return true;
  }

  toggleFilter(event: MouseEvent): void {
    const el = event.currentTarget as unknown as HTMLElement;
    this.params.showColumnMenu(el);
  }
}