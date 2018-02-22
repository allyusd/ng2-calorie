import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieComponent } from './calorie.component';

describe('CalorieComponent', () => {
  let component: CalorieComponent;
  let fixture: ComponentFixture<CalorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
