import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-the-look',
  standalone: false,
  templateUrl: './shop-the-look.component.html',
  styleUrl: './shop-the-look.component.scss',
})
export class ShopTheLookComponent {
  product = {
    title: 'ARYAMAN BLACK KURTA SET WITH PATIYALA AND DUPATTA',
    originalPrice: 'Rs.20,699.00',
    discountedPrice: 'Rs.17,999.00',
    image:
      'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/hunnysing.PNG',
    mainImage:
      'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/hunyasing.PNG',
    description:
      'Honey Singh in Aryaman Black Kurta set with patiyala and dupatta.',
  };
}
