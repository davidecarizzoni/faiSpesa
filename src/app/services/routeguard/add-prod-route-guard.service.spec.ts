import { TestBed } from '@angular/core/testing';

import { AddProdRouteGuardService } from './add-prod-route-guard.service';

describe('AddProdRouteGuardService', () => {
  let service: AddProdRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProdRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
