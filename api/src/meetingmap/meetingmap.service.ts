import { Injectable } from '@nestjs/common';
import { CreateMeetingMapDto } from './dtos/create-meetingmap.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { MeetingMap, MeetingMapDocument } from './schemas/meetingmap.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMeetingMapDto } from './dtos/update-meetingmap.dto';

@Injectable()
export class MeetingMapService {
  constructor(
    @InjectModel(MeetingMap.name)
    private readonly meetingMapModel: Model<MeetingMap>,
  ) {}

  async create(
    createMeetingMap: CreateMeetingMapDto,
    user: UserDocument,
  ): Promise<MeetingMapDocument> {
    return await this.meetingMapModel.create({ ...createMeetingMap, user });
  }

  async findAll(user: UserDocument): Promise<MeetingMapDocument[]> {
    return await this.meetingMapModel.find({ user: user._id });
  }

  async findOne(id: string, user: UserDocument): Promise<MeetingMapDocument> {
    const MeetingMap = await this.meetingMapModel.findById(id);

    if (!MeetingMap) return {} as MeetingMapDocument;

    if (MeetingMap.user._id.toString() !== user._id.toString())
      return {} as MeetingMapDocument;

    return MeetingMap;
  }

  async update(
    id: string,
    updateMeetingMap: UpdateMeetingMapDto,
    user: UserDocument,
  ): Promise<MeetingMapDocument> {
    const MeetingMap = await this.meetingMapModel.findOneAndUpdate(
      { _id: id, user: user._id },
      updateMeetingMap,
      { new: true },
    );

    if (!MeetingMap) return {} as MeetingMapDocument;

    return MeetingMap;
  }

  async delete(id: string, user: UserDocument): Promise<MeetingMapDocument> {
    const MeetingMap = await this.meetingMapModel.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!MeetingMap) return {} as MeetingMapDocument;

    return MeetingMap;
  }
}
