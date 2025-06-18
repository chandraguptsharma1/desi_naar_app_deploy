import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRewayatComponent } from './shop-rewayat.component';

describe('ShopRewayatComponent', () => {
  let component: ShopRewayatComponent;
  let fixture: ComponentFixture<ShopRewayatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopRewayatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopRewayatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
