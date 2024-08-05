import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorStatisticsComponent } from './decor-statistics.component';

describe('DecorStatisticsComponent', () => {
  let component: DecorStatisticsComponent;
  let fixture: ComponentFixture<DecorStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecorStatisticsComponent]
    });
    fixture = TestBed.createComponent(DecorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
