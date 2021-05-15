import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUserData, LoginFormData } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { TOASTR_DURATION } from '../../constants';
import { CommonService } from '../../CommonService';
import { Router } from '@angular/router';
import * as authAction from '../../store/actions/authAction';
import { StoreState } from 'src/app/store/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: CommonService,
    private store: Store<StoreState>,
    private router: Router) { }

  ngOnInit(): void {
  }
  loginForm = this.formBuilder.group({
    mobileNumber: [null,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: [null,[Validators.required]]
  });
  get loginFormControl() {
    return this.loginForm.controls;
  }
  isFormFieldValid(formControl) {
    return formControl.dirty && formControl.invalid && formControl.errors;
  }
  onSubmit() {
    const LoginData: LoginFormData = {
      mobile_no: this.loginFormControl.mobileNumber.value,
      password: this.loginFormControl.password.value,
    };
    const observer = this.service.login(LoginData).subscribe(
      (response: any) => {
        const loggedinUserData: AuthUserData = {
          token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVObyI6IjkwMDAwMDAwMDEiLCJpYXQiOjE2MjEwNjczNTZ9.wD_ltBfn90RT74xjOYSFybN5nQ2w8farBbyr8NeZzuc',
          id: response.body.id,
          mobile_no: response.body.mobile_no,
          role: response.body.role,
          name: response.body.name
        };
        this.store.dispatch(new authAction.SetAuthUser(loggedinUserData));
        this.router.navigateByUrl('/user-detail');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error[0], 'Error', {
          timeOut: TOASTR_DURATION,
        });
      },
    );
    // this.subscriptions.add(observer);
  }
}
