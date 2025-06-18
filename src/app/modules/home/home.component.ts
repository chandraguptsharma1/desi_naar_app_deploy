import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit {
  Riwayat: any;

  constructor() {}

  ngOnInit(): void {
    sessionStorage.removeItem('collectionType');
    // Any initialization logic can go here
  }


}
