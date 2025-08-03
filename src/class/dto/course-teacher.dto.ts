import { IsInt, IsOptional } from 'class-validator';

export class ClassCourseTeacherDto {

  @IsInt()
  @IsOptional()
  classId: number;

  @IsInt()
  courseId: number;

  @IsInt()
  teacherId: number;
}
