import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  constructor() {
  }

  list(): Observable<Product[]> {
    console.log('fetch list by impl class');
    return of([]);
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
