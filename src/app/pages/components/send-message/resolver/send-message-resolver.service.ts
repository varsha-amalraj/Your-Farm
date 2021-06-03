import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/pages/service/helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SendMessageResolverService {

  constructor(private service: HelperService) { }
  resolve(dataLength) {
    return this.service.sendEmailToClient(dataLength);
  }
  resolveSendMessage(userData: any, i, messageParams) {
    if (i < 9) {
      this.service.sendMessage(userData, messageParams);
    } else {
      setTimeout(() => this.service.sendMessage(userData, messageParams), 20000);
    }

  }
}
