import { TestBed } from '@angular/core/testing';

import { StatisticsGenerationService } from './statistics-generation.service';

describe('StatisticsGenerationService', () => {
  let service: StatisticsGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsGenerationService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
