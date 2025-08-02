import { IsInt, IsNumber } from 'class-validator';

export class StudentDto {
  @IsInt()
  studentId: number;
}
