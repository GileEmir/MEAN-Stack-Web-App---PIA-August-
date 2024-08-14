import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddDecoratorComponent } from './admin-add-decorator.component';

describe('AdminAddDecoratorComponent', () => {
  let component: AdminAddDecoratorComponent;
  let fixture: ComponentFixture<AdminAddDecoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddDecoratorComponent]
    });
    fixture = TestBed.createComponent(AdminAddDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
