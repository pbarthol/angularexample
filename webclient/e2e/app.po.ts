import { browser, by, element, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import Promise = promise.Promise;

export class FAMRatingAnalysisPage {

  selectorSector: any;
  selectorRegion: any;
  selectorFAMRating: any;
  selectorBenchmark: any;
  selectorFromDate: ElementArrayFinder;
  selectorToDate: ElementArrayFinder;
  selectorExportData: any;

  constructor() {
    this.selectorSector = element(by.id('sector'));
    this.selectorRegion = element(by.id('region'));
    this.selectorFAMRating = element(by.id('famrating'));
    this.selectorBenchmark = element(by.id('benchmark'));
    this.selectorFromDate = element.all(by.id('fromDateToggle'));
    this.selectorToDate = element.all(by.id('toDateToggle'));
    this.selectorExportData = element(by.id('exportbutton'));
  }

  setSector(sector: string) {
    this.selectorSector.click();
    element(by.cssContainingText('.mat-option-text', sector)).click();
  }

  setRegion(region: string) {
    this.selectorRegion.click();
    element(by.cssContainingText('.mat-option-text', region)).click();
  }

  setFAMRating(rating: string) {
    this.selectorFAMRating.click();
    element(by.cssContainingText('.mat-option-text', rating)).click();
  }

  setBenchmark(benchmark: string) {
    this.selectorBenchmark.click();
    element(by.cssContainingText('.mat-option-text', benchmark)).click();
  }

  openFromDate() {
    this.selectorFromDate.then(toggles => {
      toggles[0].click();
    });
  }

  openToDate() {
    this.selectorToDate.then(toggles => {
      toggles[0].click();
    });
  }

  switchToNextMonth() {
    element.all(by.css('.mat-calendar-next-button')).then(nextMoth => {
      nextMoth[0].click();
    });
  }

  switchToPreviousMonth() {
    element.all(by.css('.mat-calendar-previous-button')).then(nextMoth => {
      nextMoth[0].click();
    });
  }

  chooseDay() {
    let day = new Date().getDate();
    if (day > 28) {
      day = 28; // because of month february
    }
    element.all(by.cssContainingText('.mat-calendar-body-cell-content', day.toString())).then(dayCells => {
      dayCells[0].click();
    });
  }
  isChartDisplayed() {
    element.all(by.id('chart')).then(arr => {
      return expect(arr.length).toEqual(1);
    });
  }

  isChartNotDisplayed() {
    element.all(by.id('chart')).then(arr => {
      return expect(arr.length).toEqual(0);
    });
  }

  dataAreAvaiable() {
    element.all(by.cssContainingText('.mat-figure', 'No Data available')).then(arr => {
      return expect(arr.length).toEqual(0); // Text not found -> Ok
    });
  }

  dataAreNotAvaiable() {
    element.all(by.cssContainingText('.mat-figure', 'No Data available')).then(arr => {
      return expect(arr.length).toEqual(1); // Text found -> Ok
    });
  }

  eportData() {
    this.selectorExportData.click();
  }


  navigateTo() {
    browser.get('/pm/fam-rating-analysis');
  }
}

