import { TestBed, inject } from '@angular/core/testing';

import { InfoToasterService } from './info-toaster.service';

describe('InfoToasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoToasterService]
    });
  });

  it('should be created', inject([InfoToasterService], (service: InfoToasterService) => {
    expect(service).toBeTruthy();
  }));
});
