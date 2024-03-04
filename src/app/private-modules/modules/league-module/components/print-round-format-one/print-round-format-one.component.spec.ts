import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRoundFormatOneComponent } from './print-round-format-one.component';

describe('PrintRoundFormatOneComponent', () => {
  let component: PrintRoundFormatOneComponent;
  let fixture: ComponentFixture<PrintRoundFormatOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintRoundFormatOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintRoundFormatOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
