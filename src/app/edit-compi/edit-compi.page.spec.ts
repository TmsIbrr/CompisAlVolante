import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCompiPage } from './edit-compi.page';

describe('EditCompiPage', () => {
  let component: EditCompiPage;
  let fixture: ComponentFixture<EditCompiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
