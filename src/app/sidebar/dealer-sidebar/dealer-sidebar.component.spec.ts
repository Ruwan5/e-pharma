import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSidebarComponent } from './dealer-sidebar.component';

describe('DealerSidebarComponent', () => {
  let component: DealerSidebarComponent;
  let fixture: ComponentFixture<DealerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
