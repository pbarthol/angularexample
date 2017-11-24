 import {Component, Input, Output, EventEmitter, AfterContentInit} from '@angular/core';
import { GridOptions, ColDef } from 'ag-grid/main';

import { validCellRender, checkResultCellRender, inIndexCellRender } from '../cell-renders';
import { spreadsListCellStyle, ratingCellStyle, symbolCellStyle,
  numberSort, ratingCurrentSort, ratingProposedSort } from '../cell-renders';


@Component({
  selector: 'ft-credit-spreads-list',
  templateUrl: './credit-spreads-list.component.html',
  styleUrls: ['./credit-spreads-list.component.css']
})
export class CreditSpreadsListComponent implements AfterContentInit {

  @Input() tableData: any[] = [];
  @Output() selectSpread = new EventEmitter<number>();

  public gridOptions: GridOptions;

  select($event) {
    this.selectSpread.emit($event);
  }

  constructor() {

    this.gridOptions = {
      columnDefs: [
        {headerName: 'ISIN',
          field: 'isin'},
        {headerName: 'Instrument',
          field: 'instr_ref'},
        {headerName: 'Currency',
          field: 'currency'},
        {headerName: 'in TR Global Focus Index',
          field: 'with_index_positions', cellRenderer: inIndexCellRender, cellStyle: symbolCellStyle},
        {headerName: 'Current Credit Spread',
          field: 'credit_spread_current', cellStyle: spreadsListCellStyle, comparator: numberSort},
        {headerName: 'Proposed Credit Spread',
          field: 'credit_spread_proposed', cellStyle: spreadsListCellStyle, comparator: numberSort},
        {headerName: 'Current Implied Rating',
          field: 'implied_rating_current', cellStyle: ratingCellStyle, comparator: ratingCurrentSort},
        {headerName: 'Proposed Implied Rating',
          field: 'implied_rating_proposed', cellStyle: ratingCellStyle, comparator: ratingProposedSort},
        {headerName: 'Validated',
          field: 'is_validate', cellRenderer: validCellRender, cellStyle: symbolCellStyle},
        {headerName: 'Check Result',
          field: 'score', sort: 'desc', cellRenderer: checkResultCellRender, cellStyle: symbolCellStyle},
      ],
      enableSorting: true,
      rowHeight: 48,
      rowSelection: 'multiple',
    };

  }

  gridResize() {
    // mega-shit have to use timeout
    setTimeout( () => {
       this.gridOptions.columnApi.autoSizeColumns(this.gridOptions.columnDefs
         .map( (res: ColDef) => res.field)
       );
      this.gridOptions.api.sizeColumnsToFit(); }
    );

  }

  ngAfterContentInit () {

  }

}
