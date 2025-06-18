import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { CenterLoaderComponent } from './center-loader/center-loader.component';

@NgModule({
  declarations: [ButtonComponent, ModalComponent, CenterLoaderComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, ModalComponent, CenterLoaderComponent],
})
export class SharedModule {}
