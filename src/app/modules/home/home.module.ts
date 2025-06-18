import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { NewArrivalNaayabComponent } from './new-arrival-naayab/new-arrival-naayab.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { ShopRewayatComponent } from './components/shop-rewayat/shop-rewayat.component';
import { ClassicMirrorKurtasComponent } from './components/classic-mirror-kurtas/classic-mirror-kurtas.component';
import { ShopTheLookComponent } from './components/shop-the-look/shop-the-look.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    BannerComponent,
    FeaturedProductsComponent,
    CategoriesComponent,
    NewArrivalsComponent,
    NewArrivalNaayabComponent,
    CollectionListComponent,
    ShopRewayatComponent,
    ClassicMirrorKurtasComponent,
    ShopTheLookComponent,
    FooterComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
  exports: [HeaderComponent, FooterComponent],
})
export class HomeModule {}
