import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistSidebarComponent } from './pharmacist-sidebar.component';

describe('PharmacistSidebarComponent', () => {
  let component: PharmacistSidebarComponent;
  let fixture: ComponentFixture<PharmacistSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
