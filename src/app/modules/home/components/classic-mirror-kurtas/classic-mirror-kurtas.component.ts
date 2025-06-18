import { Component } from '@angular/core';

@Component({
  selector: 'app-classic-mirror-kurtas',
  standalone: false,
  templateUrl: './classic-mirror-kurtas.component.html',
  styleUrl: './classic-mirror-kurtas.component.scss',
})
export class ClassicMirrorKurtasComponent {
  kurtas = [
    {
      name: 'CHAITANYA - MAUVE PURPLE MIRROR WORK KURTA SET WITH PATIYALA AND DUPATTA',
      price: 'from Rs.14,499.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/classic1.PNG',
    },
    {
      name: 'ARJUN BIJLANI IN ILIAN - BLACK REAL MIRROR WORK KURTA SET WITH DUPATTA',
      price: 'from Rs.14,499.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/classic2.PNG',
    },
    {
      name: 'AIJAAZ - ONION PINK MIRROR EMBROIDERED KURTA SET',
      price: 'from Rs.8,999.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/classic4.PNG',
    },
    {
      name: 'DAKSHA REAL MIRROR WORK YELLOW KURTA JACKET SET WITH TROUSER AND DUPATTA',
      price: 'from Rs.17,999.00',
      image:
        'https://ewppyeqhqylgauppwvjd.supabase.co/storage/v1/object/public/3gContent/desinaar/classoc3.PNG',
    },
  ];
}
