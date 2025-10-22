import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsubjecttoteacherComponent } from './mapsubjecttoteacher.component';

describe('MapsubjecttoteacherComponent', () => {
  let component: MapsubjecttoteacherComponent;
  let fixture: ComponentFixture<MapsubjecttoteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsubjecttoteacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsubjecttoteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
