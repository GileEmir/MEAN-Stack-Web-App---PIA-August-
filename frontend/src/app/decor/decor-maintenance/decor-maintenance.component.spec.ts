import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorMaintenanceComponent } from './decor-maintenance.component';

describe('DecorMaintenanceComponent', () => {
  let component: DecorMaintenanceComponent;
  let fixture: ComponentFixture<DecorMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecorMaintenanceComponent]
    });
    fixture = TestBed.createComponent(DecorMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
