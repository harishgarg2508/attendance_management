import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StudentDto {
  @IsInt()
  studentId: number;
}


export class AddStudentDto {
  @IsInt()
  classId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students: StudentDto[];
}

