
import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromRating from '../fam-rating-analysis/reducers';
import * as fromCredit from '../credit-spreads-validation/reducers';


export interface AppState {
  rating: fromRating.RatingState;
  credit: fromCredit.CreditState;
}

const reducers = {
  rating: fromRating.ratingReducer,
  credit: fromCredit.creditReducer,
};

const reducer: ActionReducer<AppState> = combineReducers(reducers);

export function appReducer(state: any, action: any) {
  return reducer(state, action);
}
