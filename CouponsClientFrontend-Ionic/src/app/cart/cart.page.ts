import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, ViewWillEnter {

  cart: any[] = [];
  total: number = 0;
  tax: number = 0;
  totalWithTax: number = 0;

  constructor(private router:Router) {}

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, item) => acc + item.quantity * item.regularPrice * (1 - item.percentageDiscount / 100), 0);
    this.tax = this.total * 0.13;
    this.totalWithTax = this.total + this.tax;
  }

  increaseQuantity(index: number) {
    this.cart[index].quantity += 1;
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
      this.saveCart();
    }
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotal();
  }

  checkout() {
    this.router.navigate(['/checkout'], {
      state: {
        totalWithTax: this.totalWithTax
      }
    });
  }
}
