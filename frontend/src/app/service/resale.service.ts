import { Injectable } from '@angular/core';
import { Product, ProductRepository } from '../repostiory/product/product-repository.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResaleService {

  constructor(
    private repository: ProductRepository
  ) {
  }

  list(): Observable<Product[]> {
    return this.repository.list();
  }
}
