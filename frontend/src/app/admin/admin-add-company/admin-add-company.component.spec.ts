import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCompanyComponent } from './admin-add-company.component';

describe('AdminAddCompanyComponent', () => {
  let component: AdminAddCompanyComponent;
  let fixture: ComponentFixture<AdminAddCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddCompanyComponent]
    });
    fixture = TestBed.createComponent(AdminAddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
