import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


import { CreditSpreadsActions } from '../actions';
import { CreditSpreadsService } from '../services';


@Injectable()
export class CreditSpreadsEffects {

  @Effect() load_data_all$ = this.update$
    .ofType(CreditSpreadsActions.LOAD_DATA_ALL)
    .switchMap(() => this.creditSpreadsService.loadSpreads())
    .map(data => this.creditSpreadsActions.loadDataAllSuccess(data));

  @Effect() validate_shown_spread$ = this.update$
    .ofType(CreditSpreadsActions.VALIDATE_SHOWN_SPREADS)
    .switchMap(() => this.creditSpreadsService.validateShownSpreads()
      .first()
      .mergeMap( (res) => res.map( () => this.creditSpreadsActions.loadDataAll()))
    );

  @Effect() validate_single_spread$ = this.update$
    .ofType(CreditSpreadsActions.VALIDATE_SINGLE_SPREADS)
    .map((action) => action.payload)
    .switchMap((payload) => this.creditSpreadsService.validateSingleSpread(payload)
      .first()
      .mergeMap( (res) => res.map( () => this.creditSpreadsActions.loadDataAll()))
    );

  @Effect() check_single_spread$ = this.update$
    .ofType(CreditSpreadsActions.CHECK_SINGLE_SPREADS)
    .map((action) => action.payload)
    .switchMap((payload) => this.creditSpreadsService.checkSingleSpread(payload)
      .first()
      .mergeMap( (res) => res.map( () => this.creditSpreadsActions.loadDataAll()))
    );

  @Effect() set_selected_spread$ = this.update$
    .ofType(CreditSpreadsActions.SET_SELECTED_SPREAD)
    .switchMap( () => this.creditSpreadsService.loadMetaData())
    .map(data => this.creditSpreadsActions.loadMetaDataSuccess(data));

  constructor(private update$: Actions,
              private creditSpreadsActions: CreditSpreadsActions,
              private creditSpreadsService: CreditSpreadsService) {
  }

}
