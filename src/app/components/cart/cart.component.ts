import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StoreService } from './../services/store.service';
import { MatTableDataSource } from '@angular/material';
export interface Product {
  name: string;
  price: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  email = this.authService.getUserEmail();
  selectedProducts = this.authService.getUserCart() || [];
  displayedColumns: string[] = ['name', 'price', 'action'];
  products: Product[];
  dataSource: MatTableDataSource<Product>;

  constructor(private authService: AuthService, private storeService: StoreService) { }

  ngOnInit() {
    this.products = this.storeService.getProducts()
      .filter(data => this.selectedProducts.includes(data.name));
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  getTotalCost() {
    return this.dataSource.data
      .map(t => this.selectedProducts.includes(t.name) ? t.price : 0)
      .reduce((acc, value) => acc + value, 0);
  }

  delete(name: string) {
    this.selectedProducts = this.selectedProducts.filter(item => item !== name);
    this.products = this.products.filter(data => this.selectedProducts.includes(data.name));
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.storeService.saveToStorage(this.selectedProducts);
  }

  inCart(name: string) {
    return this.selectedProducts.includes(name);
  }

  logout() {
    this.authService.logout();
  }

}
