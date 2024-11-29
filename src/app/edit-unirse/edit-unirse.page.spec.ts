import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUnirsePage } from './edit-unirse.page';

describe('EditUnirsePage', () => {
  let component: EditUnirsePage;
  let fixture: ComponentFixture<EditUnirsePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnirsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
