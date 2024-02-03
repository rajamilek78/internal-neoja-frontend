import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPlayerFileComponent } from './upload-player-file.component';

describe('UploadPlayerFileComponent', () => {
  let component: UploadPlayerFileComponent;
  let fixture: ComponentFixture<UploadPlayerFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadPlayerFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPlayerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
