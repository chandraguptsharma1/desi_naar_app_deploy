import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: ListProductsComponent }, // Default => show products
      { path: 'products', component: ListProductsComponent },
      { path: 'products/add', component: AddProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
