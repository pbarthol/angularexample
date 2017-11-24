/**
 * Created by bap on 9/29/17.
 */
import {Action} from '@ngrx/store';
import { FamRatingAnalysisActions } from '../actions/index';


export class FamRatingAnalysisPlotFilterRegions {
  regions: string[];
}

export class FamRatingAnalysisPlotFilterSectors {
  sectors: string[];
}

export class FamRatingAnalysisPlotFilterRatings {
  ratings: string[];
}

export class FamRatingAnalysisPlotFilterBenchmark {
  benchmark: string[];
}

export class FamRatingAnalysisPlot {
  description: string;
  x: number[];
  y: number[];
}

export interface State {
  famRatingAnalysisPlot: FamRatingAnalysisPlot[];
  famRatingAnalysisPlotFilterRegion: FamRatingAnalysisPlotFilterRegions;
  famRatingAnalysisPlotFilterSector: FamRatingAnalysisPlotFilterSectors;
  famRatingAnalysisPlotFilterRating: FamRatingAnalysisPlotFilterRatings;
  famRatingAnalysisPlotFilterBenchmark: FamRatingAnalysisPlotFilterBenchmark;
  inSync: boolean;
  exportFinish: boolean;
}

const initialState: State = {
  famRatingAnalysisPlot: [],
  famRatingAnalysisPlotFilterRegion: null,
  famRatingAnalysisPlotFilterSector: null,
  famRatingAnalysisPlotFilterRating: null,
  famRatingAnalysisPlotFilterBenchmark: null,
  inSync: false,
  exportFinish: false,
};

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case FamRatingAnalysisActions.LOAD_PLOT_DATA_ALL_SUCCESS:
      return Object.assign({}, state, {
        famRatingAnalysisPlot: action.payload['plot_data'],
        famRatingAnalysisPlotFilterRegion: action.payload['regions'],
        famRatingAnalysisPlotFilterSector: action.payload['sectors'],
        famRatingAnalysisPlotFilterRating: action.payload['ratings'],
        famRatingAnalysisPlotFilterBenchmark: action.payload['benchmark'],
        // plot_data length is 0 if  no data received form backend
        // E.g. there is no rated instrument with sector Government
        inSync: true
    });

    case FamRatingAnalysisActions.SET_IN_SYNC:
      return Object.assign({}, state, {inSync: action.payload});

    case FamRatingAnalysisActions.DATA_EXPORT_STARTED:
      return Object.assign({}, state, {exportFinish: false});

    case FamRatingAnalysisActions.DATA_EXPORT_FINISH:
      return Object.assign({}, state, {inSync: true, exportFinish: true});

    default:
      return state;

  }
}
