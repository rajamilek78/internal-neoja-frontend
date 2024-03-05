import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRoundFormatTwoComponent } from './print-round-format-two.component';

describe('PrintRoundFormatTwoComponent', () => {
  let component: PrintRoundFormatTwoComponent;
  let fixture: ComponentFixture<PrintRoundFormatTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintRoundFormatTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintRoundFormatTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
