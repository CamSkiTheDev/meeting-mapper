import { PartialType } from '@nestjs/swagger';
import { CreateMeetingMapDto } from './create-meetingmap.dto';

export class UpdateMeetingMapDto extends PartialType(CreateMeetingMapDto) {}
