import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {Observable} from 'rxjs/Rx';

import {GridOptions, ColDef} from 'ag-grid';

import {DataService} from '../services/data.service';
import {CheckResult} from '../models/checks';
import {SpreadRating, OfficialRatings, CriticalTransition} from '../models/spreads';
import {validCellRender, intCellRenderer} from '../cell-renders';
import { spreadsDetailCellStyle, ratingCellStyle, symbolCellStyle } from '../cell-renders';


@Component({
  selector: 'ft-checks-detail',
  templateUrl: './checks-detail.component.html',
  styleUrls: ['./checks-detail.component.scss']
})
export class ChecksDetailComponent implements OnInit {

  @Input() checkData: any;
  @Input() checkDataGrid: any;
  @Input() icvVector: SpreadRating[];
  @Input() brokersPriority: string[];
  @Input() officialRatings: OfficialRatings;
  @Input() criticalTransitions: CriticalTransition[];
  @Input() manualValue: number;
  @Output() validateSingleSpread = new EventEmitter<string>();
  @Output() checkSingleSpread = new EventEmitter<number | string>();

  public gridOptions: GridOptions;
  public checkResults: Observable<CheckResult[]>;

  constructor(private dataService: DataService) {

    this.gridOptions = {
      columnDefs: [
        {headerName: '', field: 'dataset', cellStyle: {'text-align': 'left'}},
        {headerName: 'Validated', field: 'is_validate', cellRenderer: validCellRender, cellStyle: symbolCellStyle},
        {headerName: 'Barclays', field: 'credit_spread_barclays', cellStyle: spreadsDetailCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'Daiwa', field: 'credit_spread_daiwa', cellStyle: spreadsDetailCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'Nomura', field: 'credit_spread_nomura', cellStyle: spreadsDetailCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'BNP', field: 'credit_spread_bnp', cellStyle: spreadsDetailCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'Citi', field: 'credit_spread_citi', cellStyle: spreadsDetailCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'Deutsche Bank', field: 'credit_spread_deutschebank', cellStyle: spreadsDetailCellStyle,
          cellRenderer: intCellRenderer},
        {headerName: 'Brokers prioritized', field: 'credit_spread_brokers', cellStyle: spreadsDetailCellStyle,
          cellRenderer: intCellRenderer},
        {headerName: 'FAM', field: 'credit_spread_fam', cellStyle: spreadsDetailCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'Credit Spread', field: 'credit_spread', cellStyle: spreadsDetailCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'Implied Rating', field: 'implied_rating', cellStyle: ratingCellStyle},
      ],
      enableSorting: true,
      rowHeight: 48,
    };

  }

  gridResize() {
    // mega-shit have to use timeout
    setTimeout( () => {

      this.gridOptions.columnApi.autoSizeColumns(this.gridOptions.columnDefs
         .map( (res: ColDef) => res.field)
       );
      this.gridOptions.api.sizeColumnsToFit();
      this.gridOptions.columnApi.moveColumns(this.brokersPriority, 2);
    }, 500);

  }

  ngOnInit() {
    this.checkResults = this.dataService.dataCheckResults;

  }

  validate() {
    this.validateSingleSpread.emit(this.checkData.spread.pre_valid.credit_spread_fam_text);
  }

  check() {
    this.checkSingleSpread.emit(this.manualValue);
  }

}
