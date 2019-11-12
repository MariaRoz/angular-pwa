import { AppState } from '../../../store';
import { createSelector } from '@ngrx/store';

export const selectAuthFeature = (state: AppState) => state.auth;

export const  selectAuthError: any = createSelector(
  selectAuthFeature,
  (state) => state.authError
);
