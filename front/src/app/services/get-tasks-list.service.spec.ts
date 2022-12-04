import { TestBed } from '@angular/core/testing';

import { GetTasksListService } from './get-tasks-list.service';

describe('GetTasksListService', () => {
  let service: GetTasksListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTasksListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
