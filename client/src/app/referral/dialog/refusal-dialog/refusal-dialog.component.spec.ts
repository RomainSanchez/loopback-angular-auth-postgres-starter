import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusalDialogComponent } from './refusal-dialog.component';

describe('RefusalDialogComponent', () => {
  let component: RefusalDialogComponent;
  let fixture: ComponentFixture<RefusalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefusalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
