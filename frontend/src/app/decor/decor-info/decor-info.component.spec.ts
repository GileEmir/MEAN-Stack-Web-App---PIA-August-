import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorInfoComponent } from './decor-info.component';

describe('DecorInfoComponent', () => {
  let component: DecorInfoComponent;
  let fixture: ComponentFixture<DecorInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecorInfoComponent]
    });
    fixture = TestBed.createComponent(DecorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
