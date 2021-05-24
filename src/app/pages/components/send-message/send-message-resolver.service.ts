import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CommonService } from '../../CommonService';

@Injectable({
  providedIn: 'root'
})
export class SendMessageResolverService implements Resolve<any> {
  constructor(
    private service: CommonService,
  ) { }

  resolve(dataLength) {
    return this.service.sendEmailToClient(dataLength);
  }
  resolveSendMessage(userData: any, i) {
    if (i < 9) {
      this.service.sendMessage(userData);
    } else {
      setTimeout(() => this.service.sendMessage(userData), 20000);
    }

  }
}

