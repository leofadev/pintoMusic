import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsModalPage } from './songs-modal.page';

describe('SongsModalPage', () => {
  let component: SongsModalPage;
  let fixture: ComponentFixture<SongsModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
