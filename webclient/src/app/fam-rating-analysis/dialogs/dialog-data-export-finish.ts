/**
 * Created by bap on 10/13/17.
 */
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'dialog-data-export-finish',
  templateUrl: 'dialog-data-export-finish.html',
})

export class DataExportFinishDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
