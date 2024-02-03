import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPlayerContainerComponent } from './upload-player-container.component';

describe('UploadPlayerContainerComponent', () => {
  let component: UploadPlayerContainerComponent;
  let fixture: ComponentFixture<UploadPlayerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadPlayerContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPlayerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
