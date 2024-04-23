import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LeagueTableFormatOneComponent } from "./league-table-format-one.component";

describe("LeagueTableFormatTwoComponent", () => {
  let component: LeagueTableFormatOneComponent;
  let fixture: ComponentFixture<LeagueTableFormatOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueTableFormatOneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueTableFormatOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
