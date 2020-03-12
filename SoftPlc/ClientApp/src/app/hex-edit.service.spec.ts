import { TestBed } from '@angular/core/testing';

import { HexEditService } from './hex-edit.service';

describe('HexEditService', () => {
  let service: HexEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HexEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should group bytes correctly when mapping', () => {
    var input = ["00","00","00", "00", "00","00","00", "00", "00","00","00", "00", "00","00","00", "00", 
                 "00","00","00", "00", "00","00","00", "00", "00","00","00", "00", "00"]
    var output = service.mapBytesToHexlines(input);


    expect(output.length).toEqual(2);
    expect(output[0].bytes.length).toEqual(16);
    expect(output[1].bytes.length).toEqual(13);
  });
});
