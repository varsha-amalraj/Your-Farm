import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private userDetailSource = new BehaviorSubject('default message');
  userDetails = this.userDetailSource.asObservable();
  constructor() { }
  updateUserDetails(userData: any) {
    this.userDetailSource.next(userData)
  }

  sendEmailToClient(dataLength) {
    const messageCost = dataLength * 3;
    const params = {
      date: `Date: ${new Date()}`,
      email: 'minivarsha.a@netcon.in',
      subject: 'Your-Farm',
      users_count: `No of users: ${dataLength}`,
      message_cost: `Cost: $${messageCost}`
    }
    return emailjs.send('service_kutecu8', 'template_31nht7e', params, 'user_UCPJOmALiHMsIcUmlhP3n');
  }

  sendMessage(userData: any, messageParams) {
    const messageBody = {
      Body: `Message: ${messageParams.message}
Image Link:  ${messageParams.image}`,
      From: "whatsapp:+14155238886",
      // To: `whatsapp:${userData.mobile_no}`
      To: 'whatsapp:+918870023759'
    };
    axios
      .post(`${environment.twilioURL}/Messages.json`, new URLSearchParams(messageBody), {
        auth: {
          username: 'AC5a78a45821f32805b243368526b6a795',
          password: '8c23d030df5eb968bedcb5621de1256f'
        }
      })
      .then(
        response => {
          console.log(response.data.sid);
        },
        error => {
          console.log('error in response', error);
        }
      );

  }
  checkTwilioBalance() {
    return axios.get(`${environment.twilioURL}/Balance.json`, {
      auth: {
        username: 'AC5a78a45821f32805b243368526b6a795',
        password: '8c23d030df5eb968bedcb5621de1256f'
      }
    });
  }
}
