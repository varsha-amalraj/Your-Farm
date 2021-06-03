import { TestBed } from '@angular/core/testing';
import { HelperService } from 'src/app/pages/service/helpers/helper.service';

import { SendMessageResolverService } from './send-message-resolver.service';

describe('SendMessageResolverService', () => {
  let service: SendMessageResolverService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelperService
      ]
    });
    service = TestBed.inject(SendMessageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
