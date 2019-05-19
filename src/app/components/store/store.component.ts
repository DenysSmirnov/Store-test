import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StoreService } from './../services/store.service';
import { MatTableDataSource } from '@angular/material';

export interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  email = this.authService.getUserEmail();
  selectedProducts = this.authService.getUserCart() || [];
  displayedColumns: string[] = ['name', 'price', 'action'];
  products: Product[] = this.storeService.getProducts();
  dataSource = new MatTableDataSource<Product>(this.products);

  constructor(private authService: AuthService, private storeService: StoreService) { }

  ngOnInit() {}

  getTotalCost() {
    return this.dataSource.data
      .map(t => this.selectedProducts.includes(t.name) ? t.price : 0)
      .reduce((acc, value) => acc + value, 0);
  }

  addToCart(name: string) {
    if (this.selectedProducts.includes(name)) {
      this.selectedProducts = this.selectedProducts.filter(item => item !== name);
    } else {
      this.selectedProducts.push(name);
    }
    this.storeService.saveToStorage(this.selectedProducts);
  }

  inCart(name: string) {
    return this.selectedProducts.includes(name);
  }

  logout() {
    this.authService.logout();
  }

}
