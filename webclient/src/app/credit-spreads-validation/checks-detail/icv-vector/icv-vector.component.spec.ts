/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IcvVectorComponent } from './icv-vector.component';

describe('IcvVectorComponent', () => {
  let component: IcvVectorComponent;
  let fixture: ComponentFixture<IcvVectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcvVectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcvVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
