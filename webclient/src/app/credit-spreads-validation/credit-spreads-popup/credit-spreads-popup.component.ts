import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'ft-credit-spreads-popup',
  templateUrl: './credit-spreads-popup.component.html',
  styleUrls: ['./credit-spreads-popup.component.scss']
})
export class CreditSpreadsPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreditSpreadsPopupComponent>) { }

  ngOnInit() {
  }

}
