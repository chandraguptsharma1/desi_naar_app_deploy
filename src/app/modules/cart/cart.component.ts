import { Component, OnInit } from '@angular/core';
import { CartService } from './Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  isCartEmpty = false;
  isLoggedIn = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.getcartList();
  }

  getcartList() {
    if (this.isLoggedIn) {
      // 🔐 Logged-in user
      this.cartService.getCartList().subscribe((res: any) => {
        this.cartItems = res.data.filter((item: any) => item.productID);
        this.isCartEmpty = this.cartItems.length === 0;
        this.calculateTotal();
      });
    } else {
      // 👤 Guest user
      const guestCart = sessionStorage.getItem('guestCart');
      this.cartItems = guestCart ? JSON.parse(guestCart) : [];
      console.log('cart guest data', this.cartItems);
      this.isCartEmpty = this.cartItems.length === 0;
      this.calculateTotal();
    }
    // this.cartService.getCartList().subscribe((res: any) => {
    //   console.log('get cart list', res);

    //   this.cartItems = res.data.filter((item: any) => item.productID); // remove nulls
    //     this.isCartEmpty = this.cartItems.length === 0;
    //   this.totalPrice = this.cartItems.reduce((total, item) => {
    //     return total + item.productID?.price * item.quantity;
    //   }, 0);
    // });
  }

  updateQuantity(item: any, newQty: number) {
    newQty = Number(newQty);
    if (newQty < 1) return;

    const isLoggedIn = !!localStorage.getItem('token');

    if (isLoggedIn) {
      // 🔐 Logged-in user → Update via API
      this.cartService
        .updateCartquantity(item._id, newQty)
        .subscribe((res: any) => {
          item.quantity = newQty;
          this.updateTotalPrice();
        });
    } else {
      // 🧑 Guest user → Update session/localStorage cart
      const guestCart = JSON.parse(sessionStorage.getItem('guestCart') || '[]');
      const updatedCart = guestCart.map((cartItem: any) => {
        if (cartItem._id === item._id) {
          cartItem.quantity = newQty;
        }
        return cartItem;
      });
      sessionStorage.setItem('guestCart', JSON.stringify(updatedCart));
      this.cartItems = updatedCart;
      this.updateTotalPrice();
    }
  }

  deletecart(item: any) {
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
      // 🔐 API call for logged-in user
      this.cartService.deleteCart(item._id).subscribe((res: any) => {
        if (res.status === 200) {
          this.getcartList();
        }
      });
    } else {
      // 🧑 Guest user → Remove from session/localStorage
      const guestCart = JSON.parse(sessionStorage.getItem('guestCart') || '[]');
      const updatedCart = guestCart.filter(
        (cartItem: any) => cartItem._id !== item._id
      );
      sessionStorage.setItem('guestCart', JSON.stringify(updatedCart));
      this.cartItems = updatedCart;
      this.isCartEmpty = updatedCart.length === 0;
      this.updateTotalPrice();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.productID?.price || item.price || 0) * item.quantity;
    }, 0);
  }

  updateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      const price = item.productID?.price || item.price;
      return total + price * item.quantity;
    }, 0);
  }

  checkout() {
    const token = localStorage.getItem('token');
    console.log("checkout data",token)

    if (token) {
      // ✅ User is logged in – proceed to checkout
      this.router.navigate(['/checkout']);
    } else {
      // ❌ User not logged in – redirect to login
      this.router.navigate(['/auth']);
    }
  }
}
