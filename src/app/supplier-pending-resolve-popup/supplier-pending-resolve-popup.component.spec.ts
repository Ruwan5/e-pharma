import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPendingResolvePopupComponent } from './supplier-pending-resolve-popup.component';

describe('SupplierPendingResolvePopupComponent', () => {
  let component: SupplierPendingResolvePopupComponent;
  let fixture: ComponentFixture<SupplierPendingResolvePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPendingResolvePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPendingResolvePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
