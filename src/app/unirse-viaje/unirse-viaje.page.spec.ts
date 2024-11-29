import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnirseViajePage } from './unirse-viaje.page';

describe('UnirseViajePage', () => {
  let component: UnirseViajePage;
  let fixture: ComponentFixture<UnirseViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirseViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
