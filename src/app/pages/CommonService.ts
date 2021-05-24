import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { StoreState } from '../store/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { TOKEN } from './constants';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
  private userDetailSource = new BehaviorSubject('default message');
  userDetails = this.userDetailSource.asObservable();
  subscriptions = new Subscription();
  private url = 'https://yourfarm-api.herokuapp.com/';
  options: any;
  itemRef: any;
  constructor(private http: HttpClient, private store: Store<StoreState>,
    public db: AngularFireDatabase) {
    this.itemRef = this.db.list('message_detail');
    const observer = this.store.pipe(select('authData')).subscribe((user) => {
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: TOKEN
      });
      this.options = {
        headers: headers,
        observe: 'response' as 'body',
      };
    });
    this.subscriptions.add(observer);
  }
  updateUserDetails(userData: any) {
    this.userDetailSource.next(userData)
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  login(formData) {
    this.options = {
      observe: 'response',
    };
    return this.http.post(`${this.url}v1/login`, formData, this.options)
      .pipe(catchError(this.errorHandler));
  }
  getUserDetails(formData) {
    const params = {
      formData,
      ...this.options
    }
    return this.http.get(`${this.url}v1/users`, params);
  }
  addMessage(messageData) {
    return this.itemRef.push(messageData);
  }
  getMessageList() {
    return this.itemRef;
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
    return emailjs.send('service_kutecu8', 'template_31nht7e', params, 'user_UCPJOmALiHMsIcUmlhP3n')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });
  }
  sendMessage(userData:any) {
    const TWILIO_URL = 'https://api.twilio.com/2010-04-01/Accounts/AC5a78a45821f32805b243368526b6a795/Messages.json';
    const messageBody = {
      Body: "This is a test message",
      From: "whatsapp:+14155238886",
      // To: `whatsapp:${userData.mobile_no}`
      To: 'whatsapp:+918870023759'
    };
    axios
      .post(TWILIO_URL, new URLSearchParams(messageBody), {
        auth: {
          username: 'AC5a78a45821f32805b243368526b6a795',
          password: '7494c0076f321e93969eed48b6e984bf'
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
  errorHandler(resposeError: HttpErrorResponse) {
    return throwError(resposeError.error.errors);
  }

}
