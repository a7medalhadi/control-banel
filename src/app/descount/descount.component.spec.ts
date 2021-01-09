import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescountComponent } from './descount.component';

describe('DescountComponent', () => {
  let component: DescountComponent;
  let fixture: ComponentFixture<DescountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
