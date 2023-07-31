import { Test, TestingModule } from '@nestjs/testing';
import { MeetingMapService } from './meetingmap.service';

describe('MeetingmapService', () => {
  let service: MeetingMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingMapService],
    }).compile();

    service = module.get<MeetingMapService>(MeetingMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
