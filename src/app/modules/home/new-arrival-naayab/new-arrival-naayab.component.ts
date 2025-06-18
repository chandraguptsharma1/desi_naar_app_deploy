import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-arrival-naayab',
  standalone: false,
  templateUrl: './new-arrival-naayab.component.html',
  styleUrl: './new-arrival-naayab.component.scss',
})
export class NewArrivalNaayabComponent {
  constructor(private router: Router) {}
  products = [
    {
      name: 'TANVITH NAVY BLUE KURTA SET',
      price: 'from Rs.19,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
    },
    {
      name: 'RUDRA BLACK KURTA SET',
      price: 'from Rs.19,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
    },
    {
      name: 'KUSH WINE KURTA SET',
      price: 'from Rs.21,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
    },
    {
      name: 'SAGAR BOTTLE GREEN KURTA SET',
      price: 'from Rs.19,499.00',
      image: 'https://i.ibb.co/gbGG9PsX/product1.png',
    },
  ];

  detailsPage() {
    console.log('details page click');
    this.router.navigate(['/products/detail']);
  }
}
