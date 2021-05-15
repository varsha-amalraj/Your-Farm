import { authAction, authActionTypes } from '../actions/authAction';
import { AuthUserData } from '../../model';

const initialState: AuthUserData = {
  token: '',
  id: 0,
  mobile_no: '',
  role: '',
  name: ''
};

export function authReducer(state = initialState, action: authAction) {

  switch (action.type) {

    case authActionTypes.SET_AUTH_USER:
      return {
        ...state,
        ...action.payload,
      };
    case authActionTypes.REMOVE_AUTH_USER:
      return {
        ...initialState,
      };

    default:
      return state;
  }

}
