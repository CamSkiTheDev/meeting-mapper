import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateMeetingMapTimeWindowDto {
  @IsNumber()
  @Min(0)
  @Max(24)
  start: number;

  @IsNumber()
  @Min(0)
  @Max(24)
  end: number;
}

export class CreateMeetingMapAvailabilityDto {
  @IsNumber()
  @Min(0)
  @Max(6)
  day: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateMeetingMapTimeWindowDto)
  timeWindows: CreateMeetingMapTimeWindowDto[];
}

export class CreateMeetingMapDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Max(240)
  duration: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateMeetingMapAvailabilityDto)
  schedule: CreateMeetingMapAvailabilityDto[];
}
