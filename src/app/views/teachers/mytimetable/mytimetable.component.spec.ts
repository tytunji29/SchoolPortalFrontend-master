import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytimetableComponent } from './mytimetable.component';

describe('MytimetableComponent', () => {
  let component: MytimetableComponent;
  let fixture: ComponentFixture<MytimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MytimetableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
