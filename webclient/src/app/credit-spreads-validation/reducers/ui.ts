import { Action } from '@ngrx/store';

import { CreditSpreadsActions } from '../actions';


export interface State {
  selected_spread: number;
  filter_region: string;
  filter_sector: string;
  filter_with_positions: boolean,
  in_sync: boolean;
  valuation_date: string;
}

const initialState: State = {
  selected_spread: null,
  filter_region: '',
  filter_sector: '',
  filter_with_positions: true,
  in_sync: true,
  valuation_date: (new Date()).toISOString().substring(0, 10),
};

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case CreditSpreadsActions.SET_SELECTED_SPREAD:
      return Object.assign({}, state, {selected_spread: action.payload});

    case CreditSpreadsActions.SET_FILTER_REGION:
      return Object.assign({}, state, {filter_region: action.payload});

    case CreditSpreadsActions.SET_FILTER_SECTOR:
      return Object.assign({}, state, {filter_sector: action.payload});

    case CreditSpreadsActions.SET_FILTER_WITH_POSITIONS:
      return Object.assign({}, state, {filter_with_positions: action.payload});

    case CreditSpreadsActions.LOAD_DATA_ALL_SUCCESS:
      return Object.assign({}, state, {in_sync: true});

    case CreditSpreadsActions.LOAD_DATA_ALL:
    case CreditSpreadsActions.CHECK_SINGLE_SPREADS:
    case CreditSpreadsActions.VALIDATE_SHOWN_SPREADS:
    case CreditSpreadsActions.VALIDATE_SINGLE_SPREADS:
      return Object.assign({}, state, {in_sync: false});

    default:
      return state;
  }
}
