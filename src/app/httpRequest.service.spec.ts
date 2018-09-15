import { TestBed, inject } from '@angular/core/testing';

import { HttpRequestService } from './httpRequest.service';

describe('httpRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRequestService]
    });
  });

  it('should be created', inject([HttpRequestService], (service: HttpRequestService) => {
    expect(service).toBeTruthy();
  }));
});
