import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueContainerComponent } from './league-container.component';

describe('LeagueContainerComponent', () => {
  let component: LeagueContainerComponent;
  let fixture: ComponentFixture<LeagueContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
