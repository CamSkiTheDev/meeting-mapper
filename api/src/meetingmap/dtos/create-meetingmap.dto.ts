import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(24)
  start: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(24)
  end: number;
}

export class CreateMeetingMapAvailabilityDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(6)
  day: number;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateMeetingMapTimeWindowDto)
  timeWindows: CreateMeetingMapTimeWindowDto[];
}

export class CreateMeetingMapDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(240)
  duration: number;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateMeetingMapAvailabilityDto)
  schedule: CreateMeetingMapAvailabilityDto[];
}
