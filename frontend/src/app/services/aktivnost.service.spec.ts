import { TestBed } from '@angular/core/testing';

import { AktivnostService } from './aktivnost.service';

describe('AktivnostService', () => {
  let service: AktivnostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AktivnostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
