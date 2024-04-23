import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LeagueTableFormatTwooComponent } from "./league-table-format-two.component";

describe("LeagueTableFormatOneComponent", () => {
  let component: LeagueTableFormatTwooComponent;
  let fixture: ComponentFixture<LeagueTableFormatTwooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueTableFormatTwooComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueTableFormatTwooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
