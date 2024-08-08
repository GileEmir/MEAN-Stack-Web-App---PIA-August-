import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailComponent } from './companydetail.component';

describe('CompanydetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDetailComponent]
    });
    fixture = TestBed.createComponent(CompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
