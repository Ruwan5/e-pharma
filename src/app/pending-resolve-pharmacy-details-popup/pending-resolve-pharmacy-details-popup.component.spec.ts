import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingResolvePharmacyDetailsPopupComponent } from './pending-resolve-pharmacy-details-popup.component';

describe('PendingResolvePharmacyDetailsPopupComponent', () => {
  let component: PendingResolvePharmacyDetailsPopupComponent;
  let fixture: ComponentFixture<PendingResolvePharmacyDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingResolvePharmacyDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingResolvePharmacyDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
