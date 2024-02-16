import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScoreTableComponent } from './view-score-table.component';

describe('ViewScoreTableComponent', () => {
  let component: ViewScoreTableComponent;
  let fixture: ComponentFixture<ViewScoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewScoreTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewScoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
