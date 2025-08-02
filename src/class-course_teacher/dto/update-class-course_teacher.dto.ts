import { PartialType } from '@nestjs/mapped-types';
import { CreateClassCourseTeacherDto } from './create-class-course_teacher.dto';

export class UpdateClassCourseTeacherDto extends PartialType(CreateClassCourseTeacherDto) {}
