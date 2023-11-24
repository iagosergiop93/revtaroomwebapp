import { TestBed } from '@angular/core/testing';

import { HousingInfoService } from './housing-info.service';

describe('HousingInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HousingInfoService = TestBed.get(HousingInfoService);
    expect(service).toBeTruthy();
  });
});
