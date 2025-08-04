import { PartialType } from '@nestjs/mapped-types';
import { CreateClassCourseSessionDto } from './create-class-course-session.dto';

export class UpdateClassCourseSessionDto extends PartialType(CreateClassCourseSessionDto) {}
