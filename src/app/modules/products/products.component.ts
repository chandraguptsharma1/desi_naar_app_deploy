import { Component, OnInit } from '@angular/core';
import { ProductService } from './Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  collectionType: any;

  constructor(private productServices: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.collectionType = sessionStorage.getItem('collectionType');
    console.log('collectionType', this.collectionType);
    this.getAllProduct();
  }

  getAllProduct() {
    console.log('product list');
    let cleanCollectionType = this.collectionType?.replace(/"/g, '').trim();
    this.productServices.getAllProduct(cleanCollectionType).subscribe((res: any) => {
      console.log('Product list', res);
      this.products = res.data;
    });
  }

  getImageUrl(imageUrl: string): string {
    try {
      // Try to parse if it's a stringified array/string
      const parsed = JSON.parse(imageUrl);
      if (Array.isArray(parsed)) {
        return parsed[0];
      }
      return parsed;
    } catch {
      // If parsing fails, return as is
      return imageUrl;
    }
  }

  productDetails(product: any) {
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    this.router.navigate(['/products/detail']);
  }
}
