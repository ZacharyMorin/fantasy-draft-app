import { TestBed } from '@angular/core/testing';

import { DraftManagerService } from './draft-manager.service';

describe('DraftManagerService', () => {
  let service: DraftManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
