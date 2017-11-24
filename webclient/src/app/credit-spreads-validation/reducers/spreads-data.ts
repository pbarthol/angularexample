import {Action} from '@ngrx/store';

import { Check, Summary } from '../models/checks';
import { Spread, SpreadRating, OfficialRatings, CriticalTransition } from '../models/spreads';
import { CreditSpreadsActions } from '../actions';


export interface State {
  spreads: Spread[];
  checks: Check[];
  summarys: Summary[];
  icv_vector: SpreadRating[];
  brokers_priority: string[];
  official_ratings: OfficialRatings[];
  critical_transitions: CriticalTransition[];
}

const initialState: State = {
  spreads: [],
  checks: [],
  summarys: [],
  icv_vector: [],
  brokers_priority: [],
  official_ratings: [],
  critical_transitions: []
};

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case CreditSpreadsActions.LOAD_DATA_ALL_SUCCESS:
      return {
        spreads: action.payload.spreads,
        checks: action.payload.checks,
        summarys: action.payload.summary,
        icv_vector: state.icv_vector,
        brokers_priority: state.brokers_priority,
        official_ratings: state.official_ratings,
        critical_transitions: state.critical_transitions
      };

    case CreditSpreadsActions.LOAD_META_DATA_SUCCESS:
      return {
        spreads: state.spreads,
        checks: state.checks,
        summarys: state.summarys,
        icv_vector: action.payload.icv_vector,
        brokers_priority: action.payload.brokers_priority,
        official_ratings: action.payload.official_ratings,
        critical_transitions: action.payload.critical_transitions
      };

    default:
      return state;

  }
}
