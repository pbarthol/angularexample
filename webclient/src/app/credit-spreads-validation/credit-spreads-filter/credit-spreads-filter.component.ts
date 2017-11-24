import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'ft-credit-spreads-filter',
  templateUrl: './credit-spreads-filter.component.html',
  styleUrls: ['./credit-spreads-filter.component.css']
})
export class CreditSpreadsFilterComponent implements OnInit {

  @Input() options: string[];
  @Input() placeholder_text: string;
  @Output() selectedFilter = new EventEmitter<string>();

  all: string;

  constructor() {
    this.all = '';

  }

  ngOnInit() {
  }

  selectFilter($event) {
    this.selectedFilter.emit($event);
  }

}
