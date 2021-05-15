import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthUserData } from '../pages/model';
import { authReducer } from '../pages/store/reducers/authReducer';

export const FEATURE_NAME = 'VAPT';

const STORE_KEYS_TO_PERSIST = [
  'authData',
];

export interface StoreState {
  authData: AuthUserData;
}

export const reducers: ActionReducerMap<StoreState> = {
  authData: authReducer,
};

export const getStoreState = createFeatureSelector<StoreState>(FEATURE_NAME);

export function localStorageSyncReducer(
  reducer: ActionReducer<StoreState>,
): ActionReducer<StoreState> {
  return localStorageSync({
    keys: STORE_KEYS_TO_PERSIST,
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<StoreState, Action>> = [
  localStorageSyncReducer,
];
