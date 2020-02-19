import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyExpiredDrugsPopupComponent } from './pharmacy-expired-drugs-popup.component';

describe('PharmacyExpiredDrugsPopupComponent', () => {
  let component: PharmacyExpiredDrugsPopupComponent;
  let fixture: ComponentFixture<PharmacyExpiredDrugsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyExpiredDrugsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyExpiredDrugsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
