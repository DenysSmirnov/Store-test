import { Injectable } from '@angular/core';
import { products } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  getProducts() {
    return products;
  }

  saveToStorage(cartList: string[]) {
    localStorage.setItem('testUserCart', JSON.stringify(cartList));
  }
}
