/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OracleService } from './oracle.service';

describe('Service: Oracle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OracleService]
    });
  });

  it('should ...', inject([OracleService], (service: OracleService) => {
    expect(service).toBeTruthy();
  }));
});
