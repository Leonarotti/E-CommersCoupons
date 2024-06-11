import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  apiUrl = 'https://localhost:7125/api/Sale/processSaleRecordWithDetails'; // URL de la API

  constructor(private http: HttpClient) { }

  processSale(couponsSaleCartDTO: any) {
    return this.http.post(this.apiUrl, couponsSaleCartDTO);
  }
}
