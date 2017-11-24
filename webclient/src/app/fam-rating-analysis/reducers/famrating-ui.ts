/**
 * Created by bap on 9/25/17.
 */
import { Action } from '@ngrx/store';
import { FamRatingAnalysisActions } from '../actions/index';


export interface State {
  filterRegion: string;
  filterSector: string;
  fromDate: Date;
  toDate: Date;
  famRating: string;
  benchmark: string;
}

function getEoM(countMonth: number) {
    const today = new Date();
    let dateYear = today.getFullYear();
    let month = today.getMonth();
    month += countMonth;
    if (month + countMonth < 0) {
      dateYear -= 1;
      month = 11 + month;
    }
    const eomDate = new Date(dateYear, month, 0);
    if (eomDate.getDay() === 6) {
      eomDate.setDate(eomDate.getDate() - 1);
    }
    if (eomDate.getDay() === 0) {
      eomDate.setDate(eomDate.getDate() - 2);
    }
    return eomDate;
  }

const initialState: State = {
  filterRegion: 'All',
  filterSector: 'All',
  fromDate: getEoM(-3),
  toDate: new Date(),
  famRating: 'All',
  benchmark: 'All Instruments',
};

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case FamRatingAnalysisActions.SET_FILTER_REGION:
      return Object.assign({}, state, {filterRegion: action.payload});

    case FamRatingAnalysisActions.SET_FILTER_SECTOR:
      return Object.assign({}, state, {filterSector: action.payload});

    case FamRatingAnalysisActions.SET_FROM_DATE:
      return Object.assign({}, state, {fromDate: action.payload});

    case FamRatingAnalysisActions.SET_TO_DATE:
      return Object.assign({}, state, {toDate: action.payload});

    case FamRatingAnalysisActions.SET_FILTER_FAM_RATING:
      return Object.assign({}, state, {famRating: action.payload});

    case FamRatingAnalysisActions.SET_FILTER_BENCHMARK:
      return Object.assign({}, state, {benchmark: action.payload});
    default:
      return state;
  }
}

