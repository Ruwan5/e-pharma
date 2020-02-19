import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistChatFormComponent } from './pharmacist-chat-form.component';

describe('PharmacistChatFormComponent', () => {
  let component: PharmacistChatFormComponent;
  let fixture: ComponentFixture<PharmacistChatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistChatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
