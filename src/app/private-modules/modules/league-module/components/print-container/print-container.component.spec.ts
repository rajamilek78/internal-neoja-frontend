import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintContainerComponent } from './print-container.component';

describe('PrintContainerComponent', () => {
  let component: PrintContainerComponent;
  let fixture: ComponentFixture<PrintContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
