import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDialogueComponent } from './signup-dialogue.component';

describe('SignupDialogueComponent', () => {
  let component: SignupDialogueComponent;
  let fixture: ComponentFixture<SignupDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
