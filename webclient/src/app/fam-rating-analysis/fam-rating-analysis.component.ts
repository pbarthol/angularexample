import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {MatDialog} from '@angular/material';

import { AppState } from '../reducers';
import { FamRatingAnalysisActions } from './actions/index';
import { FamRatingAnalysisPlotFilterRegions, FamRatingAnalysisPlotFilterSectors } from './reducers/famrating-plotdata';
import { DataExportFinishDialog } from './dialogs/dialog-data-export-finish';


@Component({
  selector: 'ft-fam-rating-analysis',
  templateUrl: './fam-rating-analysis.component.html',
  styleUrls: ['./fam-rating-analysis.component.scss']
})
export class FamRatingAnalysisComponent implements OnInit {

  /** all available values for the filters */
  regions: Observable<FamRatingAnalysisPlotFilterRegions>;
  sectors: Observable<FamRatingAnalysisPlotFilterSectors>;
  inSync: Observable<boolean>;
  famRatings: string[];
  benchmarks: string[];

  /** user inputs */
  filterRegion: Observable<string>;
  filterSector: Observable<string>;
  fromDate: Observable<Date>;
  toDate: Observable<Date>;
  famRating: string;
  benchmark: string;
  showDataExportDialog: Observable<boolean>;
  fromDateValue: Date;
  toDateValue: Date;

  /** for the filters */
  placeholderTextRegion: string;
  placeholderTextSector: string;
  placeholderTextFamRating: string;
  placeholderTextBenchmark: string;

  /** for chart */
  lineChartDataAvailable: Observable<boolean>;
  lineChartData: Observable<any>;
  lineChartLabels: Observable<any[]>;
  lineChartType: string;
  lineOptions: any;
  lineChartLineColors: Observable<any>;

  /** for datepicker */
  minDateFrom: Date;
  maxDateFrom: Date;
  maxDateTo: Date;

  constructor(private famRatingAnalysisActions: FamRatingAnalysisActions,
              private store: Store<AppState>,
              private dialog: MatDialog) {

    this.fromDate = this.store.select(state => state.rating.famRatingUi.fromDate);
    this.toDate = this.store.select(state => state.rating.famRatingUi.toDate);
    this.filterRegion = this.store.select(state => state.rating.famRatingUi.filterRegion);
    this.filterSector = this.store.select(state => state.rating.famRatingUi.filterSector);

    this.store.dispatch(this.famRatingAnalysisActions.loadAllPlotData({
        fromDate: this.fromDate,
        toDate: this.toDate,
        sector: this.filterSector,
        region: this.filterRegion,
        famRating: this.famRating,
        benchmark: this.benchmark,
      })
    );
    this.minDateFrom = this.getMinDate();
    this.maxDateFrom = new Date(); // today
    this.maxDateTo = new Date(); // today
    this.fromDateValue = this.getEoM(-3);
    this.toDateValue = new Date(); // today
  }

  openExportExcelDialog() {
    this.dialog.open(DataExportFinishDialog, {
      data: { }
    });
  }

  ngOnInit() {
    /** for the filters */
    this.placeholderTextRegion = 'Region';
    this.placeholderTextSector = 'Sector';
    this.placeholderTextFamRating = 'FAM Rating';
    this.placeholderTextBenchmark = 'Benchmark';
    this.inSync = this.store.select(state => state.rating.famRatingPlotData.inSync);
    this.sectors = this.store.select(state => state.rating.famRatingPlotData.famRatingAnalysisPlotFilterSector);
    this.regions = this.store.select(state => state.rating.famRatingPlotData.famRatingAnalysisPlotFilterRegion);
    this.famRatings = ['All', '+2', '+1', '0', '-1', '-2'];
    this.benchmarks = ['All Instruments', 'Not in Benchmarks', 'TRI Global', 'TRI Global Focus', 'TRI Global Focus IG'];
    this.showDataExportDialog = this.store.select(state => state.rating.famRatingPlotData.exportFinish);

    /** for the chart */
    this.lineChartType = 'line';
    this.lineOptions = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                }
            }],
            yAxes: [{
              scaleLabel: {display: true, labelString: 'Performance [%]'}
            }]
        },
        legend: {
          position: 'top'
        }
    };

    // fill: false = only the curve is shown. The area below is not filled
    this.lineChartData = this.store.select(state => state.rating.famRatingPlotData.famRatingAnalysisPlot)
      .map(res => res.map( elem => ({
        'data': elem['y'].map(val => val * 100),
        'label': elem['description'],
        'fill': false})));

    // valuation date cames from the backend as milliseconds. Convert to date
    this.lineChartLabels = this.store.select(state => state.rating.famRatingPlotData.famRatingAnalysisPlot)
      .map(res => res.map( elem => elem['x'].map(epoch => new Date(epoch)))[0]);

    this.showDataExportDialog
      .map(res => (res ? this.openExportExcelDialog() : false)
      )
      .subscribe();

    this.lineChartDataAvailable = this.store.select(state => state.rating.famRatingPlotData.famRatingAnalysisPlot).map(res => res.length > 0);
    // Data: More than 5 records (5 ratings)
    this.lineChartLineColors = this.store.select(state => state.rating.famRatingPlotData.famRatingAnalysisPlot)
      .map(res => (res.length > 5 ?  [] : [
      { // red
        borderColor: '#FF4500',
      },
      { // dark grey
        borderColor: '#A9A9A9',
      },
      { // orange
        borderColor: '#FFA500',
      },
      { // blue
        borderColor: '#4169E1',
      },
      { // green
        borderColor: '#008000',
      }
    ]));
  }

  /** filter element events */
  selectRegion($event) {
    this.store.dispatch(this.famRatingAnalysisActions.setInSync(false));
    this.store.dispatch(this.famRatingAnalysisActions.setFilterRegion($event.value));
  }

  selectSector($event) {
    this.store.dispatch(this.famRatingAnalysisActions.setInSync(false));
    this.store.dispatch(this.famRatingAnalysisActions.setFilterSector($event.value));
  }

  selectFromDateFromCalender($event) {
    if (!this.errorMessageDates()) {
      this.store.dispatch(this.famRatingAnalysisActions.setInSync(false));
      this.store.dispatch(this.famRatingAnalysisActions.setFromDate($event.value));
    }
  }

  selectToDateFromCalender($event) {
    if (!this.errorMessageDates()) {
      this.store.dispatch(this.famRatingAnalysisActions.setInSync(false));
      this.store.dispatch(this.famRatingAnalysisActions.setToDate($event.value));
    }
  }
  selectFamRating($event) {
    this.store.dispatch(this.famRatingAnalysisActions.setInSync(false));
    this.store.dispatch(this.famRatingAnalysisActions.setFAMRating($event.value));
  }

  selectBenchmark($event) {
    this.store.dispatch(this.famRatingAnalysisActions.setInSync(false));
    this.store.dispatch(this.famRatingAnalysisActions.setBenchmark($event.value));
  }

  exportDataToExcel($event) {
    this.store.dispatch(this.famRatingAnalysisActions.setInSync(false));
    this.store.dispatch(this.famRatingAnalysisActions.setDataExportStarted());
    this.store.dispatch(this.famRatingAnalysisActions.exportDataToExcel());
  }

  getMinDate() {
    const today = new Date();
    const dateYear = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const minDate = new Date(dateYear - 1, month, day);
    if (minDate.getDay() === 6) {
      minDate.setDate(minDate.getDate() - 1);
    }
    if (minDate.getDay() === 0) {
      minDate.setDate(minDate.getDate() - 2);
    }
    return minDate;
  }

  getEoM(countMonth: number) {
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

  errorMessageDates() {
    if (this.fromDateValue >= this.toDateValue) {
      return 'From date should be smaller than To date!';
    } else {
      return false;
    }
  }

}
