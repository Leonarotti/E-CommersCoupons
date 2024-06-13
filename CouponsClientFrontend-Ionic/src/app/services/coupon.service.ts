import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { Observable } from 'rxjs';
import { CouponWithSaleDetails } from '../models/CouponWithSaleDetails';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiUrl = 'https://localhost:7125/api/Coupon'; // URL de la API

  constructor(private http: HttpClient) { }

  getCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.apiUrl);
  }

  getCouponsByClientId(clientId: number): Observable<CouponWithSaleDetails[]> {
    return this.http.get<CouponWithSaleDetails[]>(`${this.apiUrl}/GetCouponsSaleWithDetailsByClientId/${clientId}`);
  }
}
