import { Action } from '@ngrx/store';
import { AuthUserData } from '../../model';

export enum authActionTypes {
  SET_AUTH_USER = 'SET_AUTH_USER',
  REMOVE_AUTH_USER = 'REMOVE_AUTH_USER',
}

export class SetAuthUser implements Action {
  readonly type = authActionTypes.SET_AUTH_USER;
  constructor(public payload: AuthUserData) {
  }
}
export class RemoveAuthUser implements Action {
  readonly type = authActionTypes.REMOVE_AUTH_USER;
}


export type authAction = SetAuthUser | RemoveAuthUser;
