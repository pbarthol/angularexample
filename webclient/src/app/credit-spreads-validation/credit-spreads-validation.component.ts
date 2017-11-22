import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {MatDialog} from '@angular/material';

import 'rxjs/observable/combineLatest';
import * as _ from 'lodash';

import { AppState } from '../reducers/index';
import { CreditSpreadsActions } from './actions';
import { DataService } from './services';
import { Spread } from './models/spreads';
import {CreditSpreadsPopupComponent} from './credit-spreads-popup/credit-spreads-popup.component';


@Component({
  selector: 'ft-credit-spreads-validation',
  templateUrl: './credit-spreads-validation.component.html',
  styleUrls: ['./credit-spreads-validation.component.scss']
})
export class CreditSpreadsValidationComponent implements OnInit {

  /** data for the ag-grid in the credit-spreads-list component */
  dataTable: Observable<any[]>;
  /** data for the checks-detail component */
  dataCheck: Observable<any>;
  dataCheckGrid: Observable<any>;
  icvVector: Observable<any>;
  brokersPriority: Observable<string[]>;
  officialRatings: Observable<any>;
  criticalTransitions: Observable<any>;
  /** manual value default for the checks-detail component (the credit_spread_fam_prevalidation)*/
  manualValue: Observable<number|string>;

  /** all available values for the filters */
  regions: Observable<string[]>;
  sectors: Observable<string[]>;

  /** user inputs */
  selectedFilterRegion: Observable<string>;
  selectedFilterSector: Observable<string>;
  selectedWithPositions: Observable<boolean>;

  /** ui */
  in_sync: Observable<boolean>;

  /** for the filters */
  placeholder_text_region: string;
  placeholder_text_sector: string;
  use_popup: boolean;

  constructor(private creditSpreadsActions: CreditSpreadsActions,
              private dataService: DataService,
              private store: Store<AppState>,
              public dialog: MatDialog,
  ) {

    this.selectedFilterRegion = this.store.select(state => state.credit.ui.filter_region);
    this.selectedFilterSector = this.store.select(state => state.credit.ui.filter_sector);
    this.selectedWithPositions = this.store.select(state => state.credit.ui.filter_with_positions);
    this.in_sync = this.store.select(state => state.credit.ui.in_sync);

    this.store.dispatch(this.creditSpreadsActions.loadDataAll());
  }

  ngOnInit() {

    /** data for the ag-grid */
    this.dataTable = this.dataService.getDataTable(this.selectedFilterRegion, this.selectedFilterSector, this.selectedWithPositions);

    /** data for the check-detail */
    this.dataCheck = this.dataService.dataCheck;
    this.dataCheckGrid = this.dataService.dataCheckGrid;
    this.manualValue = this.dataService.checkDetailManualValue;
    this.icvVector = this.dataService.dataICVvector;
    this.brokersPriority = this.dataService.brokersPriority;
    this.officialRatings = this.dataService.officialRatings;
    this.criticalTransitions = this.dataService.criticalTransitions;

    this.regions = this.store.select(state => state.credit.data.spreads)
      .map( (spreads: Spread[]) => _.uniq(spreads.map( (spread: Spread) => spread.common.region)));
    this.sectors = this.store.select(state => state.credit.data.spreads)
      .map( (spreads: Spread[]) => _.uniq(spreads.map( (spread: Spread) => spread.common.sector)));

    /** for the filters*/
    this.placeholder_text_region = 'select a region';
    this.placeholder_text_sector = 'select a sector';

    /** for the popup **/
    Observable.combineLatest(
      this.selectedFilterRegion,
      this.selectedFilterSector,
      (region, sector) => { if ((region === '') && (sector === '')) {return true} else {return false} }
    ).subscribe( res => this.use_popup = res);
  }

  /** action dispatchers */
  selectSpread($event) {
    this.store.dispatch(this.creditSpreadsActions.setSelectedSpread($event.data.base_ptr_id));
  }

  selectRegion($event) {
    this.store.dispatch(this.creditSpreadsActions.setFilterRegion($event.value));
  }

  selectSector($event) {
    this.store.dispatch(this.creditSpreadsActions.setFilterSector($event.value));
  }

  selectWithPositions($event) {
    this.store.dispatch(this.creditSpreadsActions.setWithPositions($event.checked));
  }

  validateShownSpreads () {
    if (this.use_popup === true) {
      this.openPopUpDialog();
    } else {
      this.store.dispatch(this.creditSpreadsActions.validateShownSpreads());
    }
  }

  validateSingleSpread (data) {
    this.store.dispatch(this.creditSpreadsActions.validateSingleSpreads(data));
  }

  checkSingleSpread (data) {
    this.store.dispatch(this.creditSpreadsActions.checkSingleSpreads(data));
  }

  openPopUpDialog() {
    const dialogRef = this.dialog.open(CreditSpreadsPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.dispatch(this.creditSpreadsActions.validateShownSpreads());
      }
    });
  }

}
