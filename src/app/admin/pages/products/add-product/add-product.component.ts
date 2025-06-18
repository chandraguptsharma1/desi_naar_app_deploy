import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminproductService } from '../Services/adminproduct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  @ViewChild('mainImagesInput') mainImagesInput!: ElementRef<HTMLInputElement>;
  @ViewChild('detailImagesInput') detailImagesInput!: ElementRef<HTMLInputElement>;

  loading: boolean = false;
  addProductForm: FormGroup;
  isEditMode: boolean = false;
  editProductId: string = '';

  mainImagePreviews: string[] = [];
  detailImagePreviews: string[] = [];
  selectedMainFiles: File[] = [];
  selectedDetailFiles: File[] = [];
  imageError = '';

  existingMainImages: string[] = [];
  existingDetailImages: string[] = [];

  sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSizes: { [key: string]: boolean } = {};
  colorInput: string = '';
  colors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private adminProductService: AdminproductService,
    private router: Router
  ) {
    // Initialize selectedSizes
    this.sizeOptions.forEach(size => {
      this.selectedSizes[size] = false;
    });

    this.addProductForm = this.fb.group({
      title: [''],
      sku: [''],
      price: [''],
      sizes: [[]],
      colors: [''],
      fabricCare: this.fb.group({
        fabric: [''],
        color: [''],
        workType: [''],
        deliveryTimeline: [''],
        setIncludes: [''],
        kurtaLength: [''],
        pantsLength: [''],
        washCare: [''],
        styleCode: [''],
        additionalNotes: [''],
      }),
      deliveryAndReturns: this.fb.group({
        domesticShipping: [''],
        internationalShipping: [''],
        domesticTime: [''],
        internationalTime: [''],
        returnPolicy: [''],
      }),
    });
  }

  ngOnInit() {
    const editProductData = sessionStorage.getItem('editProduct');
    if (editProductData) {
      this.isEditMode = true;
      const product = JSON.parse(editProductData);
      console.log('Editing product:', product);
      this.editProductId = product._id;
      
      // Pre-fill the form
      this.addProductForm.patchValue({
        title: product.title,
        sku: product.sku,
        price: product.price,
        fabricCare: product.fabricCare || {},
        deliveryAndReturns: product.deliveryAndReturns || {},
      });



      // Set sizes
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach((size: string) => {
          this.selectedSizes[size] = true;
        });
        this.updateSizesFormControl();
      }

      // Set colors
     if (product.colors && typeof product.colors === 'string') {
  this.addProductForm.patchValue({ colors: product.colors });
}

      // Store existing images
      if (product.imageUrls && product.imageUrls.length > 0) {
  const parsedImages = typeof product.imageUrls[0] === 'string' && product.imageUrls[0].startsWith('[')
    ? JSON.parse(product.imageUrls[0])
    : product.imageUrls;

  this.existingMainImages = [...parsedImages];
  this.mainImagePreviews = [...parsedImages];
}

      if (product.detailImages && product.detailImages.length > 0) {
        this.existingDetailImages = [...product.detailImages];
        this.detailImagePreviews = [...product.detailImages];
      }
    }
  }

  onSizeChange(size: string, event: any) {
    this.selectedSizes[size] = event.target.checked;
    this.updateSizesFormControl();
  }

  updateSizesFormControl() {
    const selectedSizes = Object.entries(this.selectedSizes)
      .filter(([_, isSelected]) => isSelected)
      .map(([size]) => size);
    this.addProductForm.patchValue({ sizes: selectedSizes });
  }

  addColor() {
    if (this.colorInput.trim()) {
      if (!this.colors.includes(this.colorInput.trim())) {
        this.colors.push(this.colorInput.trim());
        this.addProductForm.patchValue({ colors: this.colors });
      }
      this.colorInput = '';
    }
  }

  removeColor(index: number) {
    this.colors.splice(index, 1);
    this.addProductForm.patchValue({ colors: this.colors });
  }

  onMainImageChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        this.selectedMainFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.mainImagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onDetailImageChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        this.selectedDetailFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.detailImagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeMainImage(index: number): void {
    if (index < this.existingMainImages.length) {
      this.existingMainImages.splice(index, 1);
    } else {
      const adjustedIndex = index - this.existingMainImages.length;
      this.selectedMainFiles.splice(adjustedIndex, 1);
    }
    this.mainImagePreviews.splice(index, 1);
  }

  removeDetailImage(index: number): void {
    if (index < this.existingDetailImages.length) {
      this.existingDetailImages.splice(index, 1);
    } else {
      const adjustedIndex = index - this.existingDetailImages.length;
      this.selectedDetailFiles.splice(adjustedIndex, 1);
    }
    this.detailImagePreviews.splice(index, 1);
  }

  onSubmit(): void {
    this.loading = true;
    const formValue = this.addProductForm.value;
    const formData = new FormData();

    // Append basic form data
    formData.append('title', formValue.title);
    formData.append('sku', formValue.sku);
    formData.append('price', formValue.price);
    formData.append('sizes', JSON.stringify(formValue.sizes));
    formData.append('colors', formValue.colors); // ✅ already a string

    formData.append('fabricCare', JSON.stringify(formValue.fabricCare));
    formData.append('deliveryAndReturns', JSON.stringify(formValue.deliveryAndReturns));

    // Append existing images if in edit mode
    // Append existing images if in edit mode
    if (this.isEditMode) {
    // imageUrls
    this.existingMainImages.forEach(url => {
  formData.append('imageUrls', url);
});
    formData.append('detailImages', JSON.stringify(this.existingDetailImages));

    }

     console.log('Form Data:', formData);


    // Append new main images
    this.selectedMainFiles.forEach((file: File) => {
      formData.append('images', file);
    });

    // Append new detail images
    this.selectedDetailFiles.forEach((file: File) => {
      formData.append('detailImages', file);
    });

    console.log('Form Data======>:', formData);

    const request = this.isEditMode 
      ? this.adminProductService.updateProduct(this.editProductId, formData)
      : this.adminProductService.addproduct(formData);

    request.subscribe({
      next: (response: any) => {
        if (response.statusCode == 201 || response.statusCode == 200) {
          console.log(this.isEditMode ? '✅ Product updated successfully:' : '✅ Product uploaded successfully:', response);
          this.loading = false;
          // Reset form and storage
          this.addProductForm.reset();
          this.mainImagePreviews = [];
          this.detailImagePreviews = [];
          this.selectedMainFiles = [];
          this.selectedDetailFiles = [];
          this.existingMainImages = [];
          this.existingDetailImages = [];
          this.colors = [];
          this.sizeOptions.forEach(size => {
            this.selectedSizes[size] = false;
          });
          if (this.mainImagesInput) this.mainImagesInput.nativeElement.value = '';
          if (this.detailImagesInput) this.detailImagesInput.nativeElement.value = '';
          if (this.isEditMode) {
            sessionStorage.removeItem('editProduct');
          }
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        console.error(this.isEditMode ? '❌ Update failed:' : '❌ Upload failed:', err);
        this.loading = false;
      },
    });
  }
}
