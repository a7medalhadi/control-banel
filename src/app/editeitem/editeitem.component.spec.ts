import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeitemComponent } from './editeitem.component';

describe('EditeitemComponent', () => {
  let component: EditeitemComponent;
  let fixture: ComponentFixture<EditeitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
