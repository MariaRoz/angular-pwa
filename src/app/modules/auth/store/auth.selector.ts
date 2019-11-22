import { AppState } from '../../../store';
import { createSelector } from '@ngrx/store';

export const selectAuthFeature = (state: AppState) => state.auth;

export const  selectAuthError: any = createSelector(
  selectAuthFeature,
  (state) => state.authError
);


export const selectAuthToken: any = createSelector(
  selectAuthFeature,
  (state) => state.token
);

export const selectCurrentUser: any = createSelector(
  selectAuthFeature,
  (state) => state.username
);
