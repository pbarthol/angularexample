import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';


@Injectable()
export class CreditSpreadsActions {

  static LOAD_DATA_ALL = '[Spreads] Load Data All';
  static LOAD_DATA_ALL_SUCCESS = '[Spreads] Load Data All Success';
  static LOAD_META_DATA_SUCCESS = '[Spreads] Load Meta Data Success';
  static SET_SELECTED_SPREAD = '[Spreads] Set Selected Spread';
  static SET_FILTER_REGION = '[Spreads] Set Filter Region';
  static SET_FILTER_SECTOR = '[Spreads] Set Filter Sector';
  static VALIDATE_SHOWN_SPREADS = '[Spreads] Validate Shown Spreads';
  static VALIDATE_SINGLE_SPREADS = '[Spreads] Validate Single Spreads';
  static CHECK_SINGLE_SPREADS = '[Spreads] Check Single Spreads';
  static SET_FILTER_WITH_POSITIONS = '[Spreads] Set Filter With Positions';


  loadDataAll(): Action {
    return {
      type: CreditSpreadsActions.LOAD_DATA_ALL
    };
  }

  loadDataAllSuccess(data): Action {
    return {
      type: CreditSpreadsActions.LOAD_DATA_ALL_SUCCESS,
      payload: data
    };
  }

  setSelectedSpread(spread): Action {
    return {
      type: CreditSpreadsActions.SET_SELECTED_SPREAD,
      payload: spread
    };
  }

  setFilterRegion(region): Action {
    return {
      type: CreditSpreadsActions.SET_FILTER_REGION,
      payload: region
    };
  }

  setFilterSector(sector): Action {
    return {
      type: CreditSpreadsActions.SET_FILTER_SECTOR,
      payload: sector
    };
  }

  validateShownSpreads(): Action {
    return {
      type: CreditSpreadsActions.VALIDATE_SHOWN_SPREADS,
    };
  }

  validateSingleSpreads(data): Action {
    return {
      type: CreditSpreadsActions.VALIDATE_SINGLE_SPREADS,
      payload: data
    };
  }

  checkSingleSpreads(data): Action {
    return {
      type: CreditSpreadsActions.CHECK_SINGLE_SPREADS,
      payload: data
    };
  }

  loadMetaDataSuccess(data): Action {
    return {
      type: CreditSpreadsActions.LOAD_META_DATA_SUCCESS,
      payload: data
    };
  }

  setWithPositions(data): Action {
    return {
      type: CreditSpreadsActions.SET_FILTER_WITH_POSITIONS,
      payload: data
    };
  }

}


