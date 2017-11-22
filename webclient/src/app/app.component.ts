import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ft-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  // grab the starting route for the app
  starting_route: string;
  constructor(elm: ElementRef, private router: Router) {
    this.starting_route = elm.nativeElement.getAttribute('starting_route');
  }

  // route to starting_route once the app is fully ready
  ngAfterViewInit() {
    if (this.starting_route) {
      this.router.navigate([this.starting_route]);
    }
  }

}
