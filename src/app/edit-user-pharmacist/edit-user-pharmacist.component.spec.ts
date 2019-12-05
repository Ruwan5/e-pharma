import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPharmacistComponent } from './edit-user-pharmacist.component';

describe('EditUserPharmacistComponent', () => {
  let component: EditUserPharmacistComponent;
  let fixture: ComponentFixture<EditUserPharmacistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserPharmacistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
