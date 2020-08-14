import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() items: any[];
  @Input() columns: TableColumn[];

  constructor() {
  }

  ngOnInit(): void {
  }

  hasColumns(): boolean {
    return !!this.columns && this.columns.length > 0;
  }

  hasItems(): boolean {
    return !!this.items && this.items.length > 0;
  }

  _columns(): TableColumn[] {
    if (this.hasColumns()) {
      return this.columns;
    }
    return this.hasItems() ? Object.keys(this.items[0]).map(key => ({field: key, header: key})) : [];
  }
}

export interface TableColumn {
  field: string;
  header: string;
}
