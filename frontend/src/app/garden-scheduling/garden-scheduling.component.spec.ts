import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenSchedulingComponent } from './garden-scheduling.component';

describe('GardenSchedulingComponent', () => {
  let component: GardenSchedulingComponent;
  let fixture: ComponentFixture<GardenSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardenSchedulingComponent]
    });
    fixture = TestBed.createComponent(GardenSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
