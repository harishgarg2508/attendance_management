import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';

class TeacherIdsDto {
  @IsOptional()
  @IsNumber({}, { each: true })
  teacherIds: number[];
}

export class TeacherFilterDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  teacherId: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  //@Transform(({ value }) => JSON.parse(value)) //doubt teacherIds=[1,2,3]
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    return value.split(',').map((v: string) => Number(v.trim()));
  })
  @IsNumber({}, { each: true })
  teacherIds: number[];
}
