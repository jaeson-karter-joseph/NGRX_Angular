import { TestBed } from '@angular/core/testing';

import { PersistentServiceService } from './persistent-service.service';

describe('PersistentServiceService', () => {
  let service: PersistentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
