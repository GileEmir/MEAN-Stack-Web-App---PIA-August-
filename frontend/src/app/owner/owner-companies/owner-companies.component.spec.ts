import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCompaniesComponent } from './owner-companies.component';

describe('OwnerCompaniesComponent', () => {
  let component: OwnerCompaniesComponent;
  let fixture: ComponentFixture<OwnerCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerCompaniesComponent]
    });
    fixture = TestBed.createComponent(OwnerCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
