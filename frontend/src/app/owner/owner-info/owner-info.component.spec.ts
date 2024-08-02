import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerInfoComponent } from './owner-info.component';

describe('OwnerInfoComponent', () => {
  let component: OwnerInfoComponent;
  let fixture: ComponentFixture<OwnerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerInfoComponent]
    });
    fixture = TestBed.createComponent(OwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
