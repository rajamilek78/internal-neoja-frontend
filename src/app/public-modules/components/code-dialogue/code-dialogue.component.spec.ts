import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDialogueComponent } from './code-dialogue.component';

describe('CodeDialogueComponent', () => {
  let component: CodeDialogueComponent;
  let fixture: ComponentFixture<CodeDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
