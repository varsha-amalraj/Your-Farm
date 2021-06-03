import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HelperService } from '../../service/helpers/helper.service';
import { SendMessageResolverService } from './resolver/send-message-resolver.service';

import { SendMessageComponent } from './send-message.component';

describe('SendMessageComponent', () => {
  let component: SendMessageComponent;
  let fixture: ComponentFixture<SendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendMessageComponent],
      imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        HelperService,
        SendMessageResolverService
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component', () => {
    it('creates the component', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('HTML Field', () => {
    describe('Image Field', () => {
      let image;

      beforeEach(() => {
        image = fixture.debugElement.nativeElement.querySelector('#imageId');
      });

      it('is present', () => {
        expect(image).toBeTruthy();
      });

      it('has input type as file', () => {
        expect(image.type).toBe('file');
      });

    });
  });

  describe('HTML Field', () => {
    describe('Message Field', () => {
      let message;

      beforeEach(() => {
        message = fixture.debugElement.nativeElement.querySelector('#frameMessageId');
      });

      it('is present', () => {
        expect(message).toBeTruthy();
      });

      it('has input type as text', () => {
        expect(message.type).toBe('text');
      });
      it('has correct placeholder', () => {
        expect(message.placeholder).toBe('Enter Message');
      });

    });
    describe('Code field', () => {
      let code;

      beforeEach(() => {
        code = fixture.debugElement.nativeElement.querySelector('#frameCodeId');
      });

      it('is present', () => {
        expect(code).toBeTruthy();
      });

      it('has input type as text', () => {
        expect(code.type).toBe('text');
      });

      it('has correct placeholder', () => {
        expect(code.placeholder).toBe('Enter Code');
      });
    });
  });



  // describe('#onSubmit()', () => {
  //   beforeEach(() => {
  //     component.loginForm.patchValue({
  //       mobile_no: '9876543210',
  //       password: '12345678',
  //     });
  //   });
  //   it('calls common service', () => {
  //     setTimeout(function () {
  //       const service = TestBed.inject(CommonService);

  //       const router = TestBed.inject(Router);
  //       component.onSubmit();

  //       expect(service.login).toHaveBeenCalled();
  //     }, 3000);
  //   });

  //   it('shows error message when #onSubmit() is errored out', () => {
  //     authServiceMock.login.and.returnValue(throwError('Error'));
  //     spyOn(component.toastr, 'error').and.callThrough();
  //     component.onSubmit();

  //     expect(component.toastr.error).toHaveBeenCalled();
  //   });
  // });

});
