import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminproductService } from '../Services/adminproduct.service';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  loading: boolean = false;
  products: any[] = [];
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  
  // Sorting
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Math reference for template
  Math = Math;

  constructor(
    private router: Router,
    private adminServices: AdminproductService
  ) {}

  ngOnInit() {
    this.getAllProduct();
  }

  addProdut() {
    this.router.navigate(['/admin/products/add']);
  }

  getAllProduct() {
    this.loading = true;
    this.adminServices.getProduct().subscribe(
      (res: any) => {
        console.log('product list', res);
        if (res.statusCode == 200) {
          this.products = res.data;
          this.totalItems = this.products.length;
          this.sortProducts('title', 'asc'); // Default sort
          this.loading = false;
        }
      },
      (error) => {
        console.error('Error loading products', error);
        this.loading = false;
      }
    );
  }

  // Pagination methods
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages() {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Sorting methods
  sortProducts(field: string, direction: 'asc' | 'desc' = 'asc') {
    this.sortField = field;
    this.sortDirection = direction;

    this.products.sort((a, b) => {
      let valueA = this.getFieldValue(a, field);
      let valueB = this.getFieldValue(b, field);

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  toggleSort(field: string) {
    const direction = this.sortField === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortProducts(field, direction);
  }

  private getFieldValue(obj: any, field: string): any {
    return field.split('.').reduce((o, i) => o?.[i], obj);
  }

  editProduct(product: any) {
    console.log('Edit clicked for:', product);
    sessionStorage.setItem('editProduct', JSON.stringify(product));
    this.router.navigate(['/admin/products/add']);
  }

  deleteProduct(product: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      this.adminServices.deleteProduct(product?._id).subscribe(
        (res: any) => {
          console.log('product delete response == ', res);
          if (res.statusCode == 200) {
            this.loading = false;
            this.getAllProduct();
          }
        },
        (error) => {
          console.error('Error deleting product', error);
          this.loading = false;
        }
      );
    }
  }
}
