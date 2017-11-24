import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromSpreadsData from './spreads-data';
import * as fromUi from './ui';


export interface CreditState {
  data: fromSpreadsData.State;
  ui: fromUi.State;
}

const reducers = {
  data: fromSpreadsData.reducer,
  ui: fromUi.reducer,
};

const reducer = combineReducers(reducers);

export function creditReducer(state: any, action: any) {
  return reducer(state, action);
}
