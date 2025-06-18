import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { ProductsComponent } from './products.component';
import { HomeModule } from '../home/home.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListComponent, DetailsComponent, ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule,HttpClientModule],
})
export class ProductsModule {}
