import { TestBed } from '@angular/core/testing';

import { Booksapi } from './booksapi';

describe('Booksapi', () => {
  let service: Booksapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Booksapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
