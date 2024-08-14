import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDecorsComponent } from './admin-decors.component';

describe('AdminDecorsComponent', () => {
  let component: AdminDecorsComponent;
  let fixture: ComponentFixture<AdminDecorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDecorsComponent]
    });
    fixture = TestBed.createComponent(AdminDecorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
