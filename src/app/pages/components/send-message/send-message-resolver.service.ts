import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CommonService } from '../../CommonService';

@Injectable({
  providedIn: 'root'
})
export class SendMessageResolverService implements Resolve<any> {

  constructor(
    private service: CommonService,
  ) {  }

  resolve() {
    return this.service.sendEmailToClient();
  }
  resolveSendMessage() {
    return this.service.sendMessage();
  }
}

