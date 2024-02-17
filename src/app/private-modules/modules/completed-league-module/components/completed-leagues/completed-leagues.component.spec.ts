import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedLeaguesComponent } from './completed-leagues.component';

describe('CompletedLeaguesComponent', () => {
  let component: CompletedLeaguesComponent;
  let fixture: ComponentFixture<CompletedLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedLeaguesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
