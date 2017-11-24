/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreditSpreadsService } from './credit-spreads.service';

describe('CreditSpreadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditSpreadsService]
    });
  });

  it('should ...', inject([CreditSpreadsService], (service: CreditSpreadsService) => {
    expect(service).toBeTruthy();
  }));
});
