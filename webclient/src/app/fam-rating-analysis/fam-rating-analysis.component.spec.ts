import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamRatingAnalysisComponent } from './fam-rating-analysis.component';

describe('FamRatingAnalysisComponent', () => {
  let component: FamRatingAnalysisComponent;
  let fixture: ComponentFixture<FamRatingAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamRatingAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamRatingAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
