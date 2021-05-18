import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { StoreState } from '../store/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { TOKEN } from './constants';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
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
  addMessage(messageData){
    return this.itemRef.push(messageData);
  }
  getMessageList() {
    return this.itemRef;
  }
  sendEmailToClient() {
    const params = {
      name: 'varsha',
      email: 'minivarsha.a@netcon.in',
      subject: 'sub test',
      message: 'test',
    }
    return emailjs.send('service_kutecu8', 'template_31nht7e', params, 'user_UCPJOmALiHMsIcUmlhP3n')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
  }
  errorHandler(resposeError: HttpErrorResponse) {
    return throwError(resposeError.error.errors);
  }

}
