import { TestBed } from '@angular/core/testing';

import { ForecastManagerService } from './forecast-manager.service';

describe('ForecastManagerService', () => {
  let service: ForecastManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
