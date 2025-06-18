import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-arrivals',
  standalone: false,
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.scss',
})
export class NewArrivalsComponent {
  constructor(private router: Router) {}
  products = [
    {
      name: 'TANVITH NAVY BLUE KURTA SET',
      price: 'from Rs.19,499.00',
      image: 'https://i.ibb.co/wFMcrSSy/product.png',
    },
    {
      name: 'RUDRA BLACK KURTA SET',
      price: 'from Rs.19,499.00',
      image: 'https://i.ibb.co/wFMcrSSy/product.png',
    },
    {
      name: 'KUSH WINE KURTA SET',
      price: 'from Rs.21,499.00',
      image: 'https://i.ibb.co/wFMcrSSy/product.png',
    },
    {
      name: 'SAGAR BOTTLE GREEN KURTA SET',
      price: 'from Rs.19,499.00',
      image: 'https://i.ibb.co/wFMcrSSy/product.png',
    },
  ];

  detailsPage() {
    console.log('details page click');
    this.router.navigate(['/products/detail']);
  }
}
