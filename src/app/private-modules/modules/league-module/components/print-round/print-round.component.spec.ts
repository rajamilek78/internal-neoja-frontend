import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRoundComponent } from './print-round.component';

describe('PrintRoundComponent', () => {
  let component: PrintRoundComponent;
  let fixture: ComponentFixture<PrintRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
