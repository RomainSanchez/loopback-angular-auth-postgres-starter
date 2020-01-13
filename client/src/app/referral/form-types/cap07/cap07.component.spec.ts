import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cap01Component } from './cap01.component';

describe('Cap01Component', () => {
  let component: Cap01Component;
  let fixture: ComponentFixture<Cap01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cap01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cap01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
