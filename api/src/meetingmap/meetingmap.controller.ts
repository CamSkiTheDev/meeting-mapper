import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MeetingMapService } from './meetingmap.service';
import { CreateMeetingMapDto } from './dtos/create-meetingmap.dto';
import { UpdateMeetingMapDto } from './dtos/update-meetingmap.dto';

@Controller('meetingmap')
export class MeetingmapController {
  constructor(private MeetingMapService: MeetingMapService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createMeetingMap: CreateMeetingMapDto) {
    return this.MeetingMapService.create(createMeetingMap, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.MeetingMapService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.MeetingMapService.findOne(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateMeetingMap: UpdateMeetingMapDto,
  ) {
    return this.MeetingMapService.update(id, updateMeetingMap, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.MeetingMapService.delete(id, req.user);
  }
}
