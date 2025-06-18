import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterLoaderComponent } from './center-loader.component';

describe('CenterLoaderComponent', () => {
  let component: CenterLoaderComponent;
  let fixture: ComponentFixture<CenterLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenterLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
