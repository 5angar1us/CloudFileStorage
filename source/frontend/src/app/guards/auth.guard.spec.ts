import { TestBed } from '@angular/core/testing';

import { ExpenseGuard } from './auth.guard';

describe('ExpenseGuard', () => {
  let guard: ExpenseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExpenseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
