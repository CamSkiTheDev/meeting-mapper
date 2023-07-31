import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

export enum MeetingTypeEnum {
  OneOnOne = 'OneOnOne',
}

export enum MeetingLocationEnum {
  GoogleMeeting = 'GoogleMeeting',
}

export type MeetingMapDocument = HydratedDocument<MeetingMap & Document>;

@Schema({ _id: false, timestamps: false })
export class TimeWindow {
  @Prop()
  start: number;

  @Prop()
  end: number;
}

@Schema({ _id: false, timestamps: false })
export class Availability {
  @Prop({ required: true, default: 0 })
  day: number;

  @Prop({ required: true, default: [] })
  timeWindows: TimeWindow[];
}

@Schema({ timestamps: true })
export class MeetingMap {
  @Prop({ type: Types.ObjectId, ref: 'User', autopopulate: true })
  user: User & UserDocument;

  @Prop({ required: true, default: MeetingTypeEnum.OneOnOne })
  type: MeetingTypeEnum;

  @Prop({ required: true, default: MeetingLocationEnum.GoogleMeeting })
  location: MeetingLocationEnum;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 30 })
  duration: number;

  @Prop({ required: true, default: [] })
  schedule: Availability[];
}

export const MeetingMapSchema = SchemaFactory.createForClass(MeetingMap);
