import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../../ui-libs/moluclues/table/table.component';
import { ResaleService } from '../../../../service/resale.service';

@Component({
  selector: 'app-resale-list-page',
  templateUrl: './resale-list-page.component.html',
  styleUrls: ['./resale-list-page.component.scss']
})
export class ResaleListPageComponent implements OnInit {
  items: ResaleItemViewData[];
  columns: TableColumn[] = [{field: 'name', header: '商品名'}, {field: 'onSale', header: '販売状況'}];

  constructor(
    private service: ResaleService
  ) {
  }

  ngOnInit(): void {
    this.service.list().subscribe(res => {
      this.items = res.map(v => ({name: v.name, onSale: v.onSale ? '販売中' : '売り切れ中'}));
    });
  }

}

interface ResaleItemViewData {
  name: string;
  onSale: string;
}
