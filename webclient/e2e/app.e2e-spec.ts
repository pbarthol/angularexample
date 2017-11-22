import { $, $$, browser, by, element, ElementFinder, protractor } from 'protractor';
import { isNullOrUndefined } from 'util';
import { FAMRatingAnalysisPage } from './app.po';

describe('webclient App', function() {
  let page: FAMRatingAnalysisPage;

  beforeAll(() => {
    // login to fischtank
    // otherwise the backend is not reachable
    browser.driver.get('http://bap:bap@localhost:8000');
  });

  beforeEach(() => {
    page = new FAMRatingAnalysisPage();
    page.navigateTo();
  });

  it('T1.: should display a title.', () => {
    expect(browser.getTitle().then(title => {
       expect(title).toEqual('FischTankClient');
    }));
  });

  it('T2.: test chart creation with sector Industrials.', () => {
    page.setSector('Industrials');
    page.isChartDisplayed(); // Chart found -> Ok
    page.dataAreAvaiable();
  });

  it('T3.: test chart creation with region North America.', () => {
    page.setRegion('North America')
    page.isChartDisplayed(); // Chart found -> Ok
    page.dataAreAvaiable();
  });

  it('T4.: test chart creation with FAM Rating 0.', () => {
    page.setFAMRating('0');
    page.isChartDisplayed(); // Chart found -> Ok
    page.dataAreAvaiable();
  });

  it('T5.: test chart creation with Benchmark TRI Global Focus IG.', () => {
    page.setBenchmark('TRI Global Focus IG');
    page.isChartDisplayed(); // Chart found -> Ok
    page.dataAreAvaiable();
  });

  it('T6.: test chart creation with sector Industrials and region North America.', () => {
    page.setSector('Industrials');
    page.setRegion('North America');
    page.isChartDisplayed(); // Chart found -> Ok
    page.dataAreAvaiable();
  });

  it('T7.: test chart creation with sector Cash. Should not display a plot.', () => {
    page.setSector('Cash');
    page.isChartNotDisplayed(); // Chart not found -> Ok
    page.dataAreNotAvaiable(); // "No Data available" must be displayed
  });

  it('T8.: test From Date Input.', () => {
    page.openFromDate();
    // get one month later e.g. change from mai to june
    // click the arrow button to right
    page.switchToNextMonth(); // click next month button ">"
    page.chooseDay(); // click day
    page.isChartDisplayed(); // Chart found -> Ok
    page.dataAreAvaiable();
  });

  it('T9.: test To Date Input.', () => {
    page.openToDate();
    // get one month later e.g. change from mai to june
    // click the arrow button to left
    page.switchToPreviousMonth(); // click previous month button "<"
    page.chooseDay(); // click day
    page.isChartDisplayed(); // Chart found -> Ok
    page.dataAreAvaiable();
  });

  it('T10.: test Data Export.', () => {
    page.eportData(); // click export button
    element.all(by.cssContainingText('.mat-dialog-title', 'FAM Rating Data Export')).then(dialogs => {
      return expect(dialogs.length).toEqual(1); // Dialog found -> Ok
    });
  });


});
