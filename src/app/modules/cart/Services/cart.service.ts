import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getCartList(){
    return this.http.post(environment.baseUrl + `/cart/getCartItems`,''
    )
  }

  updateCartquantity(cartId: string, quantity: number){
    return this.http.post(environment.baseUrl + `/cart/updateCart/${cartId}` ,{ quantity })
  }

  deleteCart(cartID:any){
    return this.http.post(environment.baseUrl +  `/cart/deleteCart/${cartID}`,'')
  }
}
