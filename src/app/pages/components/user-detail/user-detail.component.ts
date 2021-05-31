import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TOASTR_DURATION } from '../../constants';
import { CommonService } from '../../service/common.service';
import { HelperService } from '../../testing/helpers/helper.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userData: any;
  page = 1;
  totalRec = 20;
  subscriptions = new Subscription();
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private service: CommonService,
    private helperService: HelperService) {
  }

  ngOnInit(): void { }
  userDetailForm = this.formBuilder.group({
    dateRange: [null, [Validators.required]],
  });
  get userDetailFormControl() {
    return this.userDetailForm.controls;
  }
  onSubmit() {
    const params = {
      created_from: moment((this.userDetailForm.get('dateRange').value).startDate).format('YYYY-MM-DD'),
      created_till: moment((this.userDetailForm.get('dateRange').value).endDate).format('YYYY-MM-DD'),
    };
    const observer = this.service.getUserDetails(params).subscribe(
      (response: any) => {
        this.userData = response.body.users;
        this.totalRec = this.userData.length;
        this.helperService.updateUserDetails(this.userData);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error[0], 'Error', {
          timeOut: TOASTR_DURATION,
        });
      },
    );
    this.subscriptions.add(observer);
  }
  pageChanged(event) {
    this.page = event;
  }
}
