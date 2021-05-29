import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { sendMessageParams } from '../mockdata/common.service.mock';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#sendMessage', () => {
    it('send message', () => {
      service.sendMessage(sendMessageParams);

      axios.post(`${environment.twilioURL}/Messages.json`);
    });
  });
  describe('#checkTwilioBalance', () => {
    it('check twilio balance', () => {
      service.checkTwilioBalance().then((res) => {
        expect(res).toEqual(res)
      });

      axios.get(`${environment.twilioURL}/Balance.json`);
    });
  });
});
