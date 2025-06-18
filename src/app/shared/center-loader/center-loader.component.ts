import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-center-loader',
  standalone: false,
  templateUrl: './center-loader.component.html',
  styleUrl: './center-loader.component.scss',
})
export class CenterLoaderComponent {
  @Input() show: boolean = false;
  @Input() message: string = 'Loading, please wait...';
}
