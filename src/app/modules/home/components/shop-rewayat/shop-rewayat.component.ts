import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-rewayat',
  standalone: false,
  templateUrl: './shop-rewayat.component.html',
  styleUrl: './shop-rewayat.component.scss',
})
export class ShopRewayatComponent {
  topProducts = [
    {
      name: 'ARHAAN - OFF WHITE SEQUINED KURTA SET',
      price: 'from Rs.11,999.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/pic1.PNG',
    },
    {
      name: 'ILQAS - OFF WHITE PATIYALA KURTA SET',
      price: 'from Rs.9,999.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/pic1.PNG',
    },
    {
      name: 'NAIRIT - PINK EMBROIDERED KURTA SET',
      price: 'from Rs.9,999.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/pic1.PNG',
    },
    {
      name: 'ZOHAIB - BLACK LONG JACKET KURTA SET',
      price: 'from Rs.9,999.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/pic1.PNG',
    },
  ];

  bottomBanners = [
    {
      title: 'Indowestern',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/shop1.PNG',
    },
    {
      title: 'Jodhpuri Set',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/shop2.PNG',
    },
  ];
}
