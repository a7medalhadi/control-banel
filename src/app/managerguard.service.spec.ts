import { TestBed } from '@angular/core/testing';

import { ManagerguardService } from './managerguard.service';

describe('ManagerguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerguardService = TestBed.get(ManagerguardService);
    expect(service).toBeTruthy();
  });
});
