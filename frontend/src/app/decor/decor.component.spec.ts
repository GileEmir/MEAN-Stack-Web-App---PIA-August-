import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorComponent } from './decor.component';

describe('DecorComponent', () => {
  let component: DecorComponent;
  let fixture: ComponentFixture<DecorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecorComponent]
    });
    fixture = TestBed.createComponent(DecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
