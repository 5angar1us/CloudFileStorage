import { TestBed } from '@angular/core/testing';

import { ModalFactory } from './modal-factory.service';

describe('Fact3Service', () => {
  let service: ModalFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
