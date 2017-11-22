import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { MatGridListModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { MatOptionModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatProgressSpinnerModule, MatTooltipModule, MatFormFieldModule, MatInputModule} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AgGridModule } from 'ag-grid-angular/main';
import { ChartsModule } from 'ng2-charts';
import 'hammerjs';

// common components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { appRoutes } from './app-routing.module';
import { appReducer } from './reducers';


// credit spread validation
import { CreditSpreadsValidationComponent } from './credit-spreads-validation/credit-spreads-validation.component';
import { CreditSpreadsListComponent } from './credit-spreads-validation/credit-spreads-list/credit-spreads-list.component';
import { ChecksDetailComponent } from './credit-spreads-validation/checks-detail/checks-detail.component';
import { CreditSpreadsFilterComponent } from './credit-spreads-validation/credit-spreads-filter/credit-spreads-filter.component'
import { CheckResultsComponent } from './credit-spreads-validation/checks-detail/checkresults/checkresults.component';
import { IcvVectorComponent } from './credit-spreads-validation/checks-detail/icv-vector/icv-vector.component';
import { CreditSpreadsPopupComponent } from './credit-spreads-validation/credit-spreads-popup/credit-spreads-popup.component';
import { CreditSpreadsService, DataService } from './credit-spreads-validation/services';
import { CreditSpreadsEffects } from './credit-spreads-validation/effects/credit-spreads';
import { CreditSpreadsActions } from './credit-spreads-validation/actions';

// fam rating analysis
import { FamRatingAnalysisEffects } from './fam-rating-analysis/effects/fam-rating-analysis';
import { FamRatingAnalysisComponent } from './fam-rating-analysis/fam-rating-analysis.component';
import { FamRatingAnalysisActions } from './fam-rating-analysis/actions/index';
import { DataExportFinishDialog } from './fam-rating-analysis/dialogs/dialog-data-export-finish';


// ag-grid-enterprise
import { LicenseManager } from 'ag-grid-enterprise/main';
LicenseManager.setLicenseKey('Fisch_Asset_Management_AG_FischOMS_1Devs14_June_2018__MTUyODkzMDgwMDAwMA==ac35a302972865622e74bb0ba43c4ac9');


@NgModule({
  declarations: [
    AppComponent,
    CreditSpreadsValidationComponent,
    AboutComponent,
    CreditSpreadsListComponent,
    ChecksDetailComponent,
    CreditSpreadsFilterComponent,
    CheckResultsComponent,
    IcvVectorComponent,
    CreditSpreadsPopupComponent,
    FamRatingAnalysisComponent,
    DataExportFinishDialog
  ],
  entryComponents: [CreditSpreadsPopupComponent, DataExportFinishDialog],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(appReducer),
    EffectsModule.run(FamRatingAnalysisEffects),
    EffectsModule.run(CreditSpreadsEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    MatGridListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    ChartsModule
  ],
  providers: [
    CreditSpreadsService,
    CreditSpreadsActions,
    FamRatingAnalysisActions,
    DataService,
    DecimalPipe,
    {provide: LOCALE_ID, useValue: 'de-CH'},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
