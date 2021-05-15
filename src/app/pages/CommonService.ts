import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { StoreState } from '../store/store';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
  subscriptions = new Subscription();
  private url = 'https://yourfarm-api.herokuapp.com/';
  options: any;
  constructor(private http: HttpClient, private store: Store<StoreState>) {
    const observer = this.store.pipe(select('authData')).subscribe((user) => {
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVObyI6IjkwMDAwMDAwMDEiLCJpYXQiOjE2MjEwNjczNTZ9.wD_ltBfn90RT74xjOYSFybN5nQ2w8farBbyr8NeZzuc'
      });
      this.options = {
        headers: headers,
        observe: 'response' as 'body',
      };
    });
    // this.subscriptions.add(observer);
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
  errorHandler(resposeError: HttpErrorResponse) {
    return throwError(resposeError.error.errors);
  }

}
