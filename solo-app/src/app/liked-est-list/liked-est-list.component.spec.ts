import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedEstListComponent } from './liked-est-list.component';

describe('LikedEstListComponent', () => {
  let component: LikedEstListComponent;
  let fixture: ComponentFixture<LikedEstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedEstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedEstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
