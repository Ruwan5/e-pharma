import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredDrugsComponent } from './expired-drugs.component';

describe('ExpiredDrugsComponent', () => {
  let component: ExpiredDrugsComponent;
  let fixture: ComponentFixture<ExpiredDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
