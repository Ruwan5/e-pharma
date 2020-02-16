import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierExpiredDrugsComponent } from './supplier-expired-drugs.component';

describe('SupplierExpiredDrugsComponent', () => {
  let component: SupplierExpiredDrugsComponent;
  let fixture: ComponentFixture<SupplierExpiredDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierExpiredDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierExpiredDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
