import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorAppointmentsComponent } from './decor-appointments.component';

describe('DecorAppointmentsComponent', () => {
  let component: DecorAppointmentsComponent;
  let fixture: ComponentFixture<DecorAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecorAppointmentsComponent]
    });
    fixture = TestBed.createComponent(DecorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
