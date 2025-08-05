import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class StudentFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  studentId?: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()

  classId?: number;
  
  @IsOptional()
  @IsNumber()
  courseId?: number;


  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    return value.split(',').map((v: string) => Number(v.trim()));
  })
  @IsNumber({}, { each: true })
  studentIds: number[];
}
