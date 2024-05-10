import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreFeedComponent } from './score-feed.component';

describe('ScoreFeedComponent', () => {
  let component: ScoreFeedComponent;
  let fixture: ComponentFixture<ScoreFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
