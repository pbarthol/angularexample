import { Routes } from '@angular/router';

import { CreditSpreadsValidationComponent } from './credit-spreads-validation/credit-spreads-validation.component';
import { FamRatingAnalysisComponent } from './fam-rating-analysis/fam-rating-analysis.component';
import { AboutComponent } from './about/about.component';


export const appRoutes: Routes = [

  { path: 'dm/credit-spreads-validation', component: CreditSpreadsValidationComponent},
  { path: 'pm/fam-rating-analysis', component: FamRatingAnalysisComponent},
  { path: '**', component: AboutComponent},

];
