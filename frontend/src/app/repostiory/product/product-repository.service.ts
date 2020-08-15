import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  constructor() {
  }

  list(): Observable<Product[]> {
    return of([
      {
        id: '1',
        name: 'バーナー',
        url: 'https://resale.com/item1',
        onSale: false
      },
      {
        id: '2',
        name: 'メスティン',
        url: 'https://resale.com/item2',
        onSale: true
      }
    ]);
  }
}

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly url: string,
    public readonly onSale: boolean,
  ) {
  }
}
