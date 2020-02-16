import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDamagedPopupComponent } from './update-damaged-popup.component';

describe('UpdateDamagedPopupComponent', () => {
  let component: UpdateDamagedPopupComponent;
  let fixture: ComponentFixture<UpdateDamagedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDamagedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDamagedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
