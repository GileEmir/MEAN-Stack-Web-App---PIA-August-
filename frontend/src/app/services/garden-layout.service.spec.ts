import { TestBed } from '@angular/core/testing';

import { GardenLayoutService } from './garden-layout.service';

describe('GardenLayoutService', () => {
  let service: GardenLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
