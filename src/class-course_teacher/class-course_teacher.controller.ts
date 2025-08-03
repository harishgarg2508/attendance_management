import { Controller } from '@nestjs/common';
import { ClassCourseTeacherService } from './class-course_teacher.service';

@Controller('class-course-teacher')
export class ClassCourseTeacherController {
  constructor(private readonly classCourseTeacherService: ClassCourseTeacherService) {}

}
