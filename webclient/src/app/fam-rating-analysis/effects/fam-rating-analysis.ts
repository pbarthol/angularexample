/**
 * Created by bap on 9/27/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { FamRatingAnalysisActions } from '../actions/index';
import { AppState } from '../../reducers';

@Injectable()
export class FamRatingAnalysisEffects {

  @Effect()
  load_plot_data_all$ = this.update$
    .ofType(FamRatingAnalysisActions.LOAD_PLOT_DATA_ALL_FROM_BACKEND,
      FamRatingAnalysisActions.SET_FILTER_REGION,
      FamRatingAnalysisActions.SET_FILTER_SECTOR,
      FamRatingAnalysisActions.SET_FROM_DATE,
      FamRatingAnalysisActions.SET_TO_DATE,
      FamRatingAnalysisActions.SET_FILTER_FAM_RATING,
      FamRatingAnalysisActions.SET_FILTER_BENCHMARK,
    )
    .withLatestFrom(this.store.select(state => state.rating.famRatingUi))
    .do(payload => console.log('payload', payload))
    .switchMap(([action, payload]) => {
      return this.http.get(
          environment.baseURL + '/pm/api/famratings/analysisplot'
          + `?from_date=${this.dateFormatLocale(payload['fromDate'])}`
          + `&to_date=${this.dateFormatLocale(payload['toDate'])}`
          + `&sector=${payload['filterSector']}`
          + `&region=${payload['filterRegion']}`
          + `&fam_rating=${payload['famRating']}`
          + `&benchmark=${payload['benchmark']}`,
          {withCredentials: true}
        )
        .map(res => res.json());
    })
    .map(res => this.famRatingAnalysisActions.loadAllPlotDataSuccess(res));

  @Effect()
  export_data_to_excel$ = this.update$
    .ofType(FamRatingAnalysisActions.EXPORT_DATA_TO_EXCEL
    )
    .map(res => this.famRatingAnalysisActions.setDataExportStarted())
    .withLatestFrom(this.store.select(state => state.rating.famRatingUi))
    .do(payload => console.log('payload', payload))
    .switchMap(([action, payload]) => {
      return this.http.get(
          environment.baseURL + '/pm/api/famratings/exportanalysisdata'
          + `?from_date=${payload['fromDate'].toISOString().substring(0, 10)}`
          + `&to_date=${payload['toDate'].toISOString().substring(0, 10)}`
          + `&sector=${payload['filterSector']}`
          + `&region=${payload['filterRegion']}`
          + `&fam_rating=${payload['famRating']}`
          + `&benchmark=${payload['benchmark']}`,
          {withCredentials: true}
        );
    })
    .map(res => this.famRatingAnalysisActions.exportDataToExcelSuccess(res))
    .map(res => this.famRatingAnalysisActions.setDataExportFinished());


  constructor(private update$: Actions,
              private store: Store<AppState>,
              private famRatingAnalysisActions: FamRatingAnalysisActions,
              private http: Http) {

  }

  dateFormatLocale(date) {
    date = new Date(date);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }

}
