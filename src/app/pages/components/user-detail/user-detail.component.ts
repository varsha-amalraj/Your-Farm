import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../CommonService';
import { TOASTR_DURATION } from '../../constants';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userData: any;
  page = 1;
  totalRec;
  config;
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: CommonService) { }

  ngOnInit(): void {  }

  userDetailForm = this.formBuilder.group({
    dateRange: [null,[Validators.required]],
  });
  get userDetailFormControl() {
    return this.userDetailForm.controls;
  }
  onPageChange(event) {

  }
  onSubmit() {
    const params = {
      created_from: moment((this.userDetailForm.get('dateRange').value).startDate).format('YYYY-MM-DD'),
      created_till: moment((this.userDetailForm.get('dateRange').value).endDate).format('YYYY-MM-DD'),
    };
    const observer = this.service.getUserDetails(params).subscribe(
      (response: any) => {
        console.log(response);

        this.userData = response.body.users;
        this.totalRec = this.userData.length;
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.totalRec
        };
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error[0], 'Error', {
          timeOut: TOASTR_DURATION,
        });
      },
    );
    // this.subscriptions.add(observer);
  }
  pageChanged(event){
    this.page = event;
  }
}
