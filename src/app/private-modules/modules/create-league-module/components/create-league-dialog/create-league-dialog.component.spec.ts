import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeagueDialogComponent } from './create-league-dialog.component';

describe('CreateLeagueDialogComponent', () => {
  let component: CreateLeagueDialogComponent;
  let fixture: ComponentFixture<CreateLeagueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLeagueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
