import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockDataDialogueComponent } from './lock-data-dialogue.component';

describe('LockDataDialogueComponent', () => {
  let component: LockDataDialogueComponent;
  let fixture: ComponentFixture<LockDataDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockDataDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LockDataDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
