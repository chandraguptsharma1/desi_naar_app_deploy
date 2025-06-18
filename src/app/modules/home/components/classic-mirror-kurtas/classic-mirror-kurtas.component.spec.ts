import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicMirrorKurtasComponent } from './classic-mirror-kurtas.component';

describe('ClassicMirrorKurtasComponent', () => {
  let component: ClassicMirrorKurtasComponent;
  let fixture: ComponentFixture<ClassicMirrorKurtasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassicMirrorKurtasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassicMirrorKurtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
