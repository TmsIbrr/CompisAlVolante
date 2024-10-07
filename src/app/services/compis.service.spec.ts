import { TestBed } from '@angular/core/testing';

import { CompisService } from './compis.service';

describe('CompisService', () => {
  let service: CompisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
