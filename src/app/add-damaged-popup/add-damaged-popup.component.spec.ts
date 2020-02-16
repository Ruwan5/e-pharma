import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDamagedPopupComponent } from './add-damaged-popup.component';

describe('AddDamagedPopupComponent', () => {
  let component: AddDamagedPopupComponent;
  let fixture: ComponentFixture<AddDamagedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDamagedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDamagedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
