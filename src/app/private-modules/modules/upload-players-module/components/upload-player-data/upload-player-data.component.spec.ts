import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPlayerDataComponent } from './upload-player-data.component';

describe('UploadPlayerDataComponent', () => {
  let component: UploadPlayerDataComponent;
  let fixture: ComponentFixture<UploadPlayerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadPlayerDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPlayerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
