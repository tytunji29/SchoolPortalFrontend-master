import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseslevelComponent } from './classeslevel.component';

describe('ClasseslevelComponent', () => {
  let component: ClasseslevelComponent;
  let fixture: ComponentFixture<ClasseslevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasseslevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasseslevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
