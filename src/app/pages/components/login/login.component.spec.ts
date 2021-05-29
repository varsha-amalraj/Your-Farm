import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AuthUserData } from '../../model';
import { CommonService } from '../../service/common.service';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let store: MockStore;
  const data = {
    startDate: '10/05/2021',
    endDate: '30/05/2021'
  };


  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('CommonService', ['mobileNumber', 'login']);
    authServiceMock.login.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [provideMockStore(), { provide: CommonService, useValue: authServiceMock },
      provideMockStore({
        initialState: { data },
      }),],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  describe('Component', () => {
    it('creates the component', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('HTML Fields', () => {
    describe('Mobile number field', () => {
      let mobileInput;

      beforeEach(() => {
        mobileInput = fixture.debugElement.nativeElement.querySelector('#mobileNumber');
      });

      it('is present', () => {
        expect(mobileInput).toBeTruthy();
      });

      it('has input type as text', () => {
        expect(mobileInput.type).toBe('text');
      });

      it('has correct placeholder', () => {
        expect(mobileInput.placeholder).toBe('Mobile Number');
      });
    });

    describe('Password field', () => {
      let passwordInput;

      beforeEach(() => {
        passwordInput = fixture.debugElement.nativeElement.querySelector('#password');
      });

      it('is present', () => {
        expect(passwordInput).toBeTruthy();
      });

      it('has input type as text', () => {
        expect(passwordInput.type).toBe('password');
      });

      it('has correct placeholder', () => {
        expect(passwordInput.placeholder).toBe('Password');
      });
    });
  });

  describe('Validation', () => {
    describe('Form level validation', () => {
      it('is not valid, when all fields are empty', () => {
        component.loginForm.controls.mobileNumber.setValue('');
        component.loginForm.controls.password.setValue('');

        expect(component.loginForm.valid).toBeFalsy();
      });

      it('phone field validity', () => {
        const phone = component.loginForm.controls.mobileNumber;
        expect(phone.valid).toBeFalsy();

        phone.setValue('');
        expect(phone.hasError('required')).toBeTruthy();

      });
      it('password field validity', () => {
        const password = component.loginForm.controls.password;
        expect(password.valid).toBeFalsy();

        password.setValue('');
        expect(password.hasError('required')).toBeTruthy();

      });

      it('is valid, when all fields are there', () => {
        component.loginForm.controls.mobileNumber.setValue('9000000001');
        component.loginForm.controls.password.setValue('123456');

        expect(component.loginForm.valid).toBeTruthy();
      });
    });

    describe('Fieldlevel Validation', () => {
      describe('Mobile Number', () => {
        let mobileNumber;

        beforeEach(() => {
          mobileNumber = component.loginForm.controls.mobileNumber;
        });

        it('validates to false on load', () => {
          expect(mobileNumber.valid).toBeFalse();
        });

        it('is required ', () => {
          mobileNumber.setValue('');
          expect(mobileNumber.errors.required).toEqual(true);
        });
      });

      describe('Password', () => {
        let password;

        beforeEach(() => {
          password = component.loginForm.controls.password;
        });

        it('validates to false on load', () => {
          expect(password.valid).toBeFalse();
        });

        it('is required ', () => {
          password.setValue('');
          expect(password.errors.required).toEqual(true);
        });
      });
    });
  });

  describe('#onSubmit()', () => {
    beforeEach(() => {
      component.loginForm.patchValue({
        mobile_no: '9876543210',
        password: '12345678',
      });
    });
    it('calls common service', () => {
      setTimeout(function () {
        const service = TestBed.inject(CommonService);

        const router = TestBed.inject(Router);
        component.onSubmit();

        expect(service.login).toHaveBeenCalled();
      }, 3000);
    });

    it('shows error message when #onSubmit() is errored out', () => {
      authServiceMock.login.and.returnValue(throwError('Error'));
      spyOn(component.toastr, 'error').and.callThrough();
      component.onSubmit();

      expect(component.toastr.error).toHaveBeenCalled();
    });
  });

});
