import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueTableFormatTwoComponent } from './league-table-format-two.component';

describe('LeagueTableFormatTwoComponent', () => {
  let component: LeagueTableFormatTwoComponent;
  let fixture: ComponentFixture<LeagueTableFormatTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueTableFormatTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueTableFormatTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
