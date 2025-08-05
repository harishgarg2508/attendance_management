import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Standard } from '../enums/standard.enum';

export class FilterDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  classId?: number;


  @IsOptional()
  @IsString()
  standard?: Standard;


  @IsOptional()
  @IsInt()
  @Type(() => Number)
  courseId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;
}
