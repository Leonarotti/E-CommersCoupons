import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/coupon';
import { CouponService } from '../services/coupon.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  charge = false;
  coupons: Coupon[] = [];
  filteredCoupons: Coupon[] = [];
  categories: Category[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  isToastOpen = false;

  constructor(
    private couponService: CouponService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.loadCoupons();
    this.loadCategories();
  }

  loadCoupons() {
    this.couponService.getCoupons().subscribe(
      (coupons) => {
        this.coupons = coupons;
        this.filteredCoupons = coupons;
        this.charge = true;
      },
      (error) => {
        console.error('Error al cargar cupones:', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  filterCoupons() {
    this.filteredCoupons = this.coupons.filter(coupon => {
      const matchesSearchTerm = this.searchTerm === '' || coupon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || coupon.enterprise.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === '' || coupon.categoryId === parseInt(this.selectedCategory, 10);
      return matchesSearchTerm && matchesCategory;
    });
  }

  addToCart(coupon: Coupon) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let existingCoupon = cart.find((item: any) => item.couponId === coupon.couponId);
    
    if (existingCoupon) {
      existingCoupon.quantity += 1;
    } else {
      cart.push({ ...coupon, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
