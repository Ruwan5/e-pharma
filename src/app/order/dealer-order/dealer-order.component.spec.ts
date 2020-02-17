import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerOrderComponent } from './dealer-order.component';

describe('DealerOrderComponent', () => {
  let component: DealerOrderComponent;
  let fixture: ComponentFixture<DealerOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
