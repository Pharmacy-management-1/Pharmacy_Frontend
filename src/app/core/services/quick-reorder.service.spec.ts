import { TestBed } from '@angular/core/testing';

import { QuickReorderService } from './quick-reorder.service';

describe('QuickReorderService', () => {
  let service: QuickReorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickReorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
