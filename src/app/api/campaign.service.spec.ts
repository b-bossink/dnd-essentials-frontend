import { TestBed } from '@angular/core/testing';

import { CampaignService } from './campaign.service';

describe('CampaignService', () => {
  let service: CampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
