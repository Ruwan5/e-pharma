import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveDamagedPopupComponent } from './resolve-damaged-popup.component';

describe('ResolveDamagedPopupComponent', () => {
  let component: ResolveDamagedPopupComponent;
  let fixture: ComponentFixture<ResolveDamagedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveDamagedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveDamagedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
