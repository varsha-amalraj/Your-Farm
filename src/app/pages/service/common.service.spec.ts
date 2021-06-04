import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { authState, logInRequestMock, logInResponseMock, requestUserDataMock, responseUserDataMock } from '../testing/mockdata/common.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StoreState } from 'src/app/store/store';
import { timer } from 'rxjs';

describe('CommonService', () => {
  let service: CommonService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let url = environment.apiURL;
  let mockStore: MockStore<StoreState['authData']>;

  const mockInitialAppState = {
    auth: authState(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommonService,
        provideMockStore({
          initialState: { ...mockInitialAppState },
        }),
      ],
    });
    injector = getTestBed();
    service = injector.inject(CommonService);
    mockStore = TestBed.inject(MockStore);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#login', () => {
    it('returns Observable should match the data', () => {
      timer(500).subscribe(() => {
        service.login(logInRequestMock).subscribe((res) => {
          expect(res).toEqual(res)
        });

        const req = httpMock.expectOne(`${url}v1/login`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(logInRequestMock);

        req.flush(logInResponseMock);
      });

    });
  });
  describe('#getUserDetails', () => {
    it('returned Observable should match the data', () => {
      service.getUserDetails(requestUserDataMock).subscribe((res) => {
        expect(res).toEqual(res);
      });

      const req = httpMock.expectOne(`${url}v1/users`);
      expect(req.request.method).toEqual('GET');

      req.flush(responseUserDataMock);
    });
  });
});
