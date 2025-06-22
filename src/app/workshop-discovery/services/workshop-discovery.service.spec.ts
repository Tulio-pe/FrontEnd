import { TestBed } from '@angular/core/testing';

import { WorkshopDiscoveryService } from './workshop-discovery.service';

describe('WorkshopDiscoveryService', () => {
  let service: WorkshopDiscoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopDiscoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
