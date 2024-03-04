import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDetailDialogueComponent } from './delete-detail-dialogue.component';

describe('DeleteDetailDialogueComponent', () => {
  let component: DeleteDetailDialogueComponent;
  let fixture: ComponentFixture<DeleteDetailDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDetailDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDetailDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
