import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

interface CustomHeaderParams extends IHeaderParams {
  field?: string;
  columnName?: string;
  filterType?: 'text' | 'number' | 'boolean';
  onFilterChange?: (field: string, value: string | number | boolean | null) => void;
  resetToken?: number;
}

@Component({
  selector: 'app-custom-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.css']
})
export class CustomHeaderComponent implements IHeaderAngularComp {
  params!: CustomHeaderParams;
  showFilter = false;
  inputValue = '';
  private lastResetToken = 0;

  agInit(params: CustomHeaderParams): void {
    this.params = params;
    this.lastResetToken = params.resetToken ?? 0;
  }

  refresh(params: CustomHeaderParams): boolean {
    if (params.resetToken !== this.lastResetToken) {
      this.inputValue = '';
      this.showFilter = false;
      this.lastResetToken = params.resetToken ?? 0;
    }

    this.params = params;
    return true;
  }

  toggleFilter(event: MouseEvent): void {
    event.stopPropagation();

    if (this.showFilter) {
      this.clearAll();
      this.showFilter = false;
      return;
    }

    this.showFilter = true;
  }

  onInputChange(value: string): void {
    this.inputValue = value;
    this.params.onFilterChange?.(this.params.field ?? '', this.getNormalizedValue(value));
  }

  onSelectChange(value: string): void {
    this.inputValue = value;
    const normalizedValue = value === '' ? null : value === 'true';
    this.params.onFilterChange?.(this.params.field ?? '', normalizedValue);
  }

  clearAll(): void {
    this.inputValue = '';
    this.params.onFilterChange?.(this.params.field ?? '', null);
  }

  private getNormalizedValue(value: string): string | number | null {
    if (this.params.filterType === 'number') {
      return value === '' ? null : Number(value);
    }

    return value === '' ? null : value;
  }
}