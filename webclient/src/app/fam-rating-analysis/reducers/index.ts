/**
 * Created by bap on 9/26/17.
 */
import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromFamRatingPlot from './famrating-plotdata';
import * as fromUi from './famrating-ui';


export interface RatingState {
  famRatingPlotData: fromFamRatingPlot.State;
  famRatingUi: fromUi.State;
}

const reducers = {
  famRatingPlotData: fromFamRatingPlot.reducer,
  famRatingUi: fromUi.reducer,
};

const reducer = combineReducers(reducers);

export function ratingReducer(state: any, action: any) {
  return reducer(state, action);
}
