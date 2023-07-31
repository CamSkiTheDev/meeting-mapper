import { Module } from '@nestjs/common';
import { MeetingMapService } from './meetingmap.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingMap, MeetingMapSchema } from './schemas/meetingmap.schema';
import { MeetingmapController } from './meetingmap.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeetingMap.name, schema: MeetingMapSchema },
    ]),
  ],
  providers: [MeetingMapService],
  controllers: [MeetingmapController],
})
export class MeetingmapModule {}
