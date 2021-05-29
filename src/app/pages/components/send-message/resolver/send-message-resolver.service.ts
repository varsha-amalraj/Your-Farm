import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/pages/testing/helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SendMessageResolverService {

  constructor(private service: HelperService) { }
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
