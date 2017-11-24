import { Component, OnInit, Input } from '@angular/core';
import { SpreadRating } from '../../models/spreads';

import { GridOptions, ColDef } from 'ag-grid';
import {ratingCellStyle, intCellRenderer} from '../../cell-renders/index';


@Component({
  selector: 'ft-icv-vector',
  templateUrl: './icv-vector.component.html',
  styleUrls: ['./icv-vector.component.scss']
})
export class IcvVectorComponent implements OnInit {

  @Input() icvVector: SpreadRating[];

  public gridOptions: GridOptions;

  constructor() {

    this.gridOptions = {
      enableFilter: true,
      columnDefs: [
        {headerName: 'Spread', field: 'credit_spread_to', cellStyle: ratingCellStyle, cellRenderer: intCellRenderer},
        {headerName: 'Rating', field: 'implied_rating', cellStyle: ratingCellStyle},
      ],
      enableSorting: true,
      rowHeight: 48,
    };

  }

  ngOnInit() {
  }

  gridResize() {
    // mega-shit have to use timeout
    setTimeout( () => {
      this.gridOptions.columnApi.autoSizeColumns(this.gridOptions.columnDefs
         .map( (res: ColDef) => res.field)
       );
      this.gridOptions.api.sizeColumnsToFit();
    });

  }

}
