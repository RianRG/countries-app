import { TestBed } from '@angular/core/testing';

import { CalculateLatLngService } from './calculate-lat-lng.service';

describe('CalculateLatLngService', () => {
  let service: CalculateLatLngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateLatLngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
