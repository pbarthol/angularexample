import {Component, OnInit, Input} from '@angular/core';

import { CheckResult } from '../../models/checks';

@Component({
  selector: 'ft-checkresults',
  templateUrl: './checkresults.component.html',
  styleUrls: ['./checkresults.component.scss']
})
export class CheckResultsComponent implements OnInit {

  @Input() checkResults: CheckResult[];

  constructor() { }

  ngOnInit() {

  }

}
