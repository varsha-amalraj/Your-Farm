import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginFormData } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { TOASTR_DURATION } from '../../constants';
import { CommonService } from '../../CommonService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: CommonService,) { }

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
    // this.submitted = true;
    const LoginData: LoginFormData = {
      mobile_no: this.loginFormControl.mobileNumber.value,
      password: this.loginFormControl.password.value,
    };
    const observer = this.service.login(LoginData).subscribe(
      (response: any) => {
        console.log(response);

        // const logedinUserData: AuthUserData = {
        //   token: response.headers.get('Authorization'),
        //   mobile: response.body.primary_mobile_no,
        //   email: response.body.primary_email_id,
        // };
        // this.store.dispatch(new authAction.SetAuthUser(logedinUserData));
        // this.router.navigateByUrl('/auth/login-verification');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error[0], 'Major Error', {
          timeOut: TOASTR_DURATION,
        });
        // this.submitted = false;
      },
    );
    // this.subscriptions.add(observer);
  }
}
