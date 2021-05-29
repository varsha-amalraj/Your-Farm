import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginatePipe } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { UserData } from '../../model';
import { CommonService } from '../../service/common.service';
import { HelperService } from '../../testing/helpers/helper.service';

import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let commonServiceMock: any;
  let mockData: UserData;

  beforeEach(async () => {
    commonServiceMock = jasmine.createSpyObj(['dateRange', 'getUserDetails']);
    commonServiceMock.getUserDetails.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [{ provide: CommonService, useValue: commonServiceMock },
      HelperService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component', () => {
    it('creates the component', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('HTML Fields', () => {
    describe('Date Range Field', () => {
      let dateRange;

      beforeEach(() => {
        dateRange = fixture.debugElement.nativeElement.querySelector('#dateRange');
      });

      it('is present', () => {
        expect(dateRange).toBeTruthy();
      });

      it('has input type as text', () => {
        expect(dateRange.type).toBe('text');
      });

      it('has correct placeholder', () => {
        expect(dateRange.placeholder).toBe('Select Date Range');
      });
    });
  });

  describe('Validation', () => {
    describe('Form level validation', () => {
      it('is not valid, when all fields are empty', () => {
        component.userDetailForm.controls.dateRange.setValue('');
        expect(component.userDetailForm.valid).toBeFalsy();
      });

      it('Date field validity', () => {
        const phone = component.userDetailForm.controls.dateRange;
        expect(phone.valid).toBeFalsy();

        phone.setValue('');
        expect(phone.hasError('required')).toBeTruthy();

      });

      it('is valid, when all fields are there', () => {
        component.userDetailForm.controls.dateRange.setValue('10/05/2021 - 30/05/2021');

        expect(component.userDetailForm.valid).toBeTruthy();
      });
    });

    describe('Fieldlevel Validation', () => {
      describe('Mobile Number', () => {
        let mobileNumber;

        beforeEach(() => {
          mobileNumber = component.userDetailForm.controls.dateRange;
        });

        it('validates to false on load', () => {
          expect(mobileNumber.valid).toBeFalse();
        });

        it('is required ', () => {
          mobileNumber.setValue('');
          expect(mobileNumber.errors.required).toEqual(true);
        });
      });
    });
  });
  describe('#onSubmit()', () => {
    beforeEach(() => {
      component.userDetailForm.controls.dateRange.setValue({
        startDate: '10/05/2021',
        endDate: '30/05/2021'
      });
    });
    it('calls common service', () => {
      const service = TestBed.inject(CommonService);
      component.onSubmit();
      expect(service.getUserDetails).toHaveBeenCalled();
    });

    it('shows error message when #onSubmit() is errored out', () => {
      commonServiceMock.getUserDetails.and.returnValue(throwError('Error'));
      spyOn(component.toastr, 'error').and.callThrough();
      component.onSubmit();

      expect(component.toastr.error).toHaveBeenCalled();
    });
  });
  // describe('pagination', () => {
  //   beforeEach(() => {
  //       component.pagination = {
  //         itemsPerPage: 10,
  //         currentPage: 1,
  //         totalItems: 15
  //       };
  //   });

  //   describe('#pageChanged', () => {
  //     it('should call dispatch store', () => {
  //       component.pageChanged(2);
  //       expect(component.onSubmit).toHaveBeenCalled();
  //     });
  //   });
  // });

});
