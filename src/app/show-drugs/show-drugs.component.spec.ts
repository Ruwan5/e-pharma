import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDrugsComponent } from './show-drugs.component';

describe('ShowDrugsComponent', () => {
  let component: ShowDrugsComponent;
  let fixture: ComponentFixture<ShowDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
