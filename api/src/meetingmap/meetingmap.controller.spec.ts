import { Test, TestingModule } from '@nestjs/testing';
import { MeetingmapController } from './meetingmap.controller';

describe('MeetingmapController', () => {
  let controller: MeetingmapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingmapController],
    }).compile();

    controller = module.get<MeetingmapController>(MeetingmapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
