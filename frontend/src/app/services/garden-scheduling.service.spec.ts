import { TestBed } from '@angular/core/testing';

import { GardenSchedulingService } from './garden-scheduling.service';

describe('GardenSchedulingService', () => {
  let service: GardenSchedulingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenSchedulingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
