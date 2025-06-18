import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminproductService {
  constructor(private http: HttpClient) {}

  addproduct(productData: any) {
    return this.http.post(
      environment.baseUrl + '/products/upload',
      productData
    );
  }

  getProduct() {
    return this.http.get(environment.baseUrl + '/products/getProduct');
  }

  deleteProduct(productId: any) {
    return this.http.post(
      environment.baseUrl + `/products/deleteProduct/${productId}`,
      ''
    );
  }

  updateProduct(productId: string, productData: any) {
    return this.http.post(
      environment.baseUrl + `/products/updateProduct/${productId}`,
      productData
    );
  }
}
