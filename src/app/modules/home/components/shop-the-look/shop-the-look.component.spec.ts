import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTheLookComponent } from './shop-the-look.component';

describe('ShopTheLookComponent', () => {
  let component: ShopTheLookComponent;
  let fixture: ComponentFixture<ShopTheLookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopTheLookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopTheLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
