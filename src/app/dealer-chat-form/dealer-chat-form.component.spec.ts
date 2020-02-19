import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerChatFormComponent } from './dealer-chat-form.component';

describe('DealerChatFormComponent', () => {
  let component: DealerChatFormComponent;
  let fixture: ComponentFixture<DealerChatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerChatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
