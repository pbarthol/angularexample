import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/combineLatest';

import { Spread } from '../models/spreads';
import {Check, Summary, CheckResult} from '../models/checks';
import { AppState } from '../../reducers';
import {DecimalPipe} from '@angular/common';
import * as _ from 'lodash';



@Injectable()
export class DataService {

  dataTable = Observable.zip(
      this.store.select(state => state.credit.data.spreads),
      this.store.select(state => state.credit.data.summarys),
      (spreads, summaries) => _.zipWith<any>(spreads, summaries, (spread, summary) => ({spread, summary}))
        .map((combined: any) => ({
          base_ptr_id: combined.spread.base_ptr_id,
          // for filtering
          region: combined.spread.common.region,
          sector: combined.spread.common.sector,
          with_positions: combined.spread.common.with_positions,
          // common data
          isin: combined.spread.common.isin,
          instr_ref: combined.spread.common.instr_ref,
          is_validate: combined.spread.pre_valid.is_validate,
          currency: combined.spread.common.currency,
          with_index_positions: combined.spread.common.with_index_positions,
          // current
          credit_spread_current: this.decimalPipe.transform(combined.spread.valid.credit_spread, '1.0-0'),
          implied_rating_current: combined.spread.valid.implied_rating,
          // proposed
          credit_spread_proposed: this.decimalPipe.transform(combined.spread.pre_valid.credit_spread, '1.0-0'),
          implied_rating_proposed: combined.spread.pre_valid.implied_rating,
          score: combined.summary.score_max
        }))
  );

  dataCheck = Observable.combineLatest(
      this.store.select(state => state.credit.ui.selected_spread),
      this.store.select(state => state.credit.data.checks),
      this.store.select(state => state.credit.data.spreads),
      this.store.select(state => state.credit.data.summarys),
      (selected_spread, checks, spreads, summarys) => ({
        base_ptr_id: selected_spread as number,
        check: checks.filter((check: Check) => check.base_ptr_id === selected_spread)[0] as Check,
        spread: spreads.filter((spread: Spread) => spread.base_ptr_id === selected_spread)[0] as Spread,
        summary: summarys.filter((summary: Summary) => summary.base_ptr_id === selected_spread)[0] as Summary,
      })
  );

  checkDetailManualValue = Observable.combineLatest(
      this.store.select(state => state.credit.ui.selected_spread),
      this.store.select(state => state.credit.data.spreads),
       (selected_spread, spreads) =>
         spreads.filter((spread: Spread) => spread.base_ptr_id === selected_spread)
           .map(spread => spread.pre_valid.credit_spread_fam)
           .map(value => parseFloat(value as string).toFixed(0))
           .filter((value: string) => value.replace('NaN', ''))
           .map( value => value)[0]
  );

  dataCheckGrid = Observable.combineLatest(
      this.store.select(state => state.credit.ui.selected_spread),
      this.store.select(state => state.credit.data.spreads),
      (selected_spread, spreads) => spreads
        .filter((spread: Spread) => spread.base_ptr_id === selected_spread)
        .map(spread => [
          Object.assign({'dataset': 'current', 'validate': spread.valid.is_validate}, spread.valid),
          Object.assign({'dataset': 'proposed', 'validate': spread.pre_valid.is_validate}, spread.pre_valid)
        ])[0]
  );

  dataCheckResults = Observable.combineLatest(
      this.store.select(state => state.credit.ui.selected_spread),
      this.store.select(state => state.credit.data.checks),
      (selected_spread, checks) => checks
        .filter( check => check.base_ptr_id === selected_spread)
        .map(check => check.checksResults)[0]
        .filter( (checkResult: CheckResult) => checkResult.failed === true)
  );

  dataICVvector = this.store.select(state => state.credit.data.icv_vector);
  brokersPriority = this.store.select(state => state.credit.data.brokers_priority);
  officialRatings = this.store.select(state => state.credit.data.official_ratings)
    .map(official_ratings => official_ratings[0]);
  criticalTransitions = this.store.select(state => state.credit.data.critical_transitions);

  constructor(private store: Store<AppState>, private decimalPipe: DecimalPipe) { }

  getDataTable(region, sector, with_positions): Observable<any> {

    return Observable.combineLatest(
      this.dataTable,
      region,
      sector,
      with_positions,
      (data, _region, _sector, _with_positions) => data
      .filter( (combined: any) => (
          (_region ? combined.region === _region : true) &&
          (_sector ? combined.sector === _sector : true) &&
          (_with_positions ? combined.with_positions === _with_positions : true)
        )
      )
    );
  }

}
