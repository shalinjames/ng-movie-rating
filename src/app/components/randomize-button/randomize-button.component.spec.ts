import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizeButtonComponent } from './randomize-button.component';

describe('RandomizeButtonComponent', () => {
  let component: RandomizeButtonComponent;
  let fixture: ComponentFixture<RandomizeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomizeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
