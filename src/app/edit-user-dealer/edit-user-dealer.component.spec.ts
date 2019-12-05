import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDealerComponent } from './edit-user-dealer.component';

describe('EditUserDealerComponent', () => {
  let component: EditUserDealerComponent;
  let fixture: ComponentFixture<EditUserDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
