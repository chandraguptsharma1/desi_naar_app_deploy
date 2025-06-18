import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProduct(collectionType:any){
    return this.http.get(environment.baseUrl + `/products/getProduct?collectionType=${collectionType}`);
  }

  addCart(productID:any){
    return this.http.post(environment.baseUrl + `/cart/saveCart/${productID}`,'')
  }
}
