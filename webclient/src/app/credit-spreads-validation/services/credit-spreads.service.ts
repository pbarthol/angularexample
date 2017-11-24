import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppState } from '../../reducers';
import {environment} from '../../../environments/environment';


@Injectable()
export class CreditSpreadsService {

  constructor(private http: Http, private store: Store<AppState>) {

  }

  loadSpreads(): Observable<any> {

    return this.store.select(state => state.credit.ui.valuation_date)
      .flatMap(valuation_date => this.http
        .get(
          environment.baseURL + `/dm/api/spreads?valuation_date=${valuation_date}`, {withCredentials: true})
        .map(res => res.json())
      );
  }

  validateShownSpreads(): Observable<any> {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers , withCredentials: true});

    return Observable.combineLatest(
      this.store.select(state => state.credit.ui.filter_region),
      this.store.select(state => state.credit.ui.filter_sector),
      this.store.select(state => state.credit.ui.valuation_date),
      (region, sector, valuation_date) =>
        this.http.post(
          environment.baseURL +
          `/dm/api/spreads/validation?valuation_date=${valuation_date}&sector=${sector}&region=${region}`,
          null, options)
          .map(res => res.json())
      );
  }

  validateSingleSpread(note_text): Observable<any> {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers , withCredentials: true});
    const data = { note_text: note_text };

    return Observable.combineLatest(
      this.store.select(state => state.credit.ui.selected_spread),
      this.store.select(state => state.credit.ui.valuation_date),
      this.store.select(state => state.credit.ui.valuation_date),
      (selected_spread, valuation_date) =>
        this.http.post(
          environment.baseURL +
          `/dm/api/spreads/validation?valuation_date=${valuation_date}&base_ptr_id=${selected_spread}`,
          data, options)
          .map(res => res.json())
      );
  }

  checkSingleSpread(manual_value): Observable<any> {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers , withCredentials: true});

    return Observable.combineLatest(
      this.store.select(state => state.credit.ui.selected_spread),
      this.store.select(state => state.credit.ui.valuation_date),
      (selected_spread, valuation_date) =>
        this.http.post(
          environment.baseURL +
          `/dm/api/spreads/check?valuation_date=${valuation_date}&base_ptr_id=${selected_spread}&manualValue=${manual_value}`,
          null, options)
          .map(res => res.json())
      );
  }

  loadMetaData(): Observable<any> {

    return this.store.select(state => state.credit.ui.selected_spread)
      .flatMap( base_ptr_id => this.http
        .get(
          environment.baseURL +
          `/dm/api/spreads/meta-data?base_ptr_id=${base_ptr_id}`, {withCredentials: true})
        .map(res => res.json())
    );
  }
}

