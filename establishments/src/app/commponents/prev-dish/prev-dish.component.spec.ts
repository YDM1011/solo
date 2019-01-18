import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevDishComponent } from './prev-dish.component';

describe('PrevDishComponent', () => {
  let component: PrevDishComponent;
  let fixture: ComponentFixture<PrevDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
