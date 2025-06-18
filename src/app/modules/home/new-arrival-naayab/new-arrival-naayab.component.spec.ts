import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivalNaayabComponent } from './new-arrival-naayab.component';

describe('NewArrivalNaayabComponent', () => {
  let component: NewArrivalNaayabComponent;
  let fixture: ComponentFixture<NewArrivalNaayabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewArrivalNaayabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArrivalNaayabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
