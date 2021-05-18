import { TestBed } from '@angular/core/testing';

import { SendMessageResolverService } from './send-message-resolver.service';

describe('SendMessageResolverService', () => {
  let service: SendMessageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMessageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
