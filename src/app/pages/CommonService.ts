import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
  subscriptions = new Subscription();
  private url = 'https://yourfarm-api.herokuapp.com/';
  options: any;
  constructor(private http: HttpClient) {
    // const observer = this.store.pipe(select('authData')).subscribe((user) => {
    //   const headers: HttpHeaders = new HttpHeaders({
    //     Authorization: user.token,
    //   });
    //   this.options = {
    //     headers: headers,
    //     observe: 'response' as 'body',
    //   };
    // });
    // this.subscriptions.add(observer);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  login(formData) {
    console.log(formData);

    return this.http.post(`${this.url}v1/login`, formData)
    .pipe(catchError(this.errorHandler));
    return this.http.post(`${this.url}v1/login`, formData, this.options);
  }
  errorHandler(resposeError: HttpErrorResponse) {
    return throwError(resposeError.error.errors);
  }

}
