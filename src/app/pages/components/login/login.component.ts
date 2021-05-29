import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TOASTR_DURATION, TOKEN } from '../../constants';
import { AuthUserData, LoginFormData } from '../../model';
import { StoreState } from 'src/app/store/store';
import * as authAction from '../../store/actions/authAction';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loggedinUserData: AuthUserData;
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    public service: CommonService,
    public store: Store<StoreState>,
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
        this.loggedinUserData = {
          token: TOKEN,
          id: response.body.id,
          mobile_no: response.body.mobile_no,
          role: response.body.role,
          name: response.body.name
        };
        this.store.dispatch(new authAction.SetAuthUser(this.loggedinUserData));
        this.router.navigate(['/user-detail']);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error[0], 'Error', {
          timeOut: TOASTR_DURATION,
        });
      },
    );
  }
}
