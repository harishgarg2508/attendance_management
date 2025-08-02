import { IsInt } from 'class-validator';

export class ClassCourseTeacherDto {
  @IsInt()
  courseId: number;

  @IsInt()
  teacherId: number;
}
