import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetailsPageComponent } from './board-details-page.component';

describe('BoardDetailsPageComponent', () => {
  let component: BoardDetailsPageComponent;
  let fixture: ComponentFixture<BoardDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardDetailsPageComponent]
    });
    fixture = TestBed.createComponent(BoardDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
