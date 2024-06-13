import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import { CouponWithSaleDetails } from '../models/CouponWithSaleDetails';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-coupons',
  templateUrl: './my-coupons.page.html',
  styleUrls: ['./my-coupons.page.scss'],
})
export class MyCouponsPage implements OnInit{

  clientId: any;
  purchasedCoupons: CouponWithSaleDetails[] = [];

  constructor(private couponService: CouponService, private authService: AuthService) { }

  ngOnInit() {
    this.getClientId();
  }

  loadPurchasedCoupons() {
    this.couponService.getCouponsByClientId(this.clientId).subscribe(
      (coupons) => {
        this.purchasedCoupons = coupons.map(coupon => ({ ...coupon, showDetails: false }));
      },
      (error) => {
        console.error('Error al cargar los cupones comprados:', error);
      }
    );
  }

  toggleDetails(coupon: CouponWithSaleDetails) {
    coupon.showDetails = !coupon.showDetails;
  }

  async getClientId() {
    this.clientId = (await this.authService.getSessionData('client')).clientId;
    this.loadPurchasedCoupons();
  }
}
