/**
 * Created by bap on 9/25/17.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';


@Injectable()
export class FamRatingAnalysisActions {

  static LOAD_DETAIL_DATA_ALL_FROM_BACKEND = '[FAM Rating Analysis] Load Analysis Detail Data All from Backend';
  static LOAD_DETAIL_DATA_ALL_SUCCESS = '[FAM Rating Analysis] Load Data All Success';
  static LOAD_PLOT_DATA_ALL_FROM_BACKEND = '[FAM Rating Analysis] Load Plot Data All from Backend';
  static LOAD_PLOT_DATA_ALL_SUCCESS = '[FAM Rating Analysis] Load Plot Data All Success';
  static LOAD_META_DATA_SUCCESS = '[FAM Rating Analysis] Load Meta Data Success';
  static EXPORT_DATA_TO_EXCEL = '[FAM Rating Analysis] Export Data to Excel';
  static EXPORT_DATA_TO_EXCEL_SUCCESS = '[FAM Rating Analysis] Export Data to Excel Success';
  static DATA_EXPORT_STARTED = '[FAM Rating Analysis] Export Data started';
  static DATA_EXPORT_FINISH = '[FAM Rating Analysis] Export Data finished';
  static SET_FROM_DATE = '[FAM Rating Analysis] Set From Date';
  static SET_TO_DATE = '[FAM Rating Analysis] Set To Date';
  static SET_FILTER_REGION = '[FAM Rating Analysis] Set Filter Region';
  static SET_FILTER_SECTOR = '[FAM Rating Analysis] Set Filter Sector';
  static SET_FILTER_FAM_RATING = '[FAM Rating Analysis] Set Filter FAM Rating';
  static SET_FILTER_BENCHMARK = '[FAM Rating Analysis] Set Filter Benchmark';
  static SET_IN_SYNC = '[FAM Rating Analysis] Set Sync';



  setInSync(inSync): Action {
    return {
      type: FamRatingAnalysisActions.SET_IN_SYNC,
      payload: inSync
    };
  }

  setFilterRegion(region): Action {
    return {
      type: FamRatingAnalysisActions.SET_FILTER_REGION,
      payload: region
    };
  }

  setFilterSector(sector): Action {
    return {
      type: FamRatingAnalysisActions.SET_FILTER_SECTOR,
      payload: sector
    };
  }

  setFromDate(fromDate): Action {
    // fromDate.setTime(fromDate.getTime() + (2 * 60 * 60 * 1000));
    return {
      type: FamRatingAnalysisActions.SET_FROM_DATE,
      payload: fromDate
    };
  }

  setToDate(toDate): Action {
    // toDate.setTime(toDate.getTime() + (2 * 60 * 60 * 1000));
    return {
      type: FamRatingAnalysisActions.SET_TO_DATE,
      payload: toDate
    };
  }

  setFAMRating(famRating): Action {
    return {
      type: FamRatingAnalysisActions.SET_FILTER_FAM_RATING,
      payload: famRating
    };
  }

  setBenchmark(benchmark): Action {
    return {
      type: FamRatingAnalysisActions.SET_FILTER_BENCHMARK,
      payload: benchmark
    };
  }

  loadAllDetailData(parameters): Action {
    return {
      type: FamRatingAnalysisActions.LOAD_DETAIL_DATA_ALL_FROM_BACKEND,
      payload: parameters
    };
  }

  loadAllDataSuccess(data): Action {
    return {
      type: FamRatingAnalysisActions.LOAD_DETAIL_DATA_ALL_SUCCESS,
      payload: data
    };
  }

  loadAllPlotData(parameters): Action {
    return {
      type: FamRatingAnalysisActions.LOAD_PLOT_DATA_ALL_FROM_BACKEND,
      payload: parameters
    };
  }

  loadAllPlotDataSuccess(data): Action {
    return {
      type: FamRatingAnalysisActions.LOAD_PLOT_DATA_ALL_SUCCESS,
      payload: data
    };
  }

  exportDataToExcel(): Action {
    return {
      type: FamRatingAnalysisActions.EXPORT_DATA_TO_EXCEL // trigger effects
    };
  }

  exportDataToExcelSuccess(data): Action {
    return {
      type: FamRatingAnalysisActions.EXPORT_DATA_TO_EXCEL_SUCCESS, // trigger effects
      payload: data
    };
  }

  setDataExportStarted(): Action {
    return {
      type: FamRatingAnalysisActions.DATA_EXPORT_STARTED,
    };
  }

  setDataExportFinished(): Action {
    return {
      type: FamRatingAnalysisActions.DATA_EXPORT_FINISH,
    };
  }
}



