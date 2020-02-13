import { TestBed } from '@angular/core/testing';

import { TicketDetailResolverService } from './ticket-detail-resolver.service';

describe('TicketDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketDetailResolverService = TestBed.get(TicketDetailResolverService);
    expect(service).toBeTruthy();
  });
});
