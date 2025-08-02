import { Module } from '@nestjs/common';
import { ClassCourseTeacherService } from './class-course_teacher.service';
import { ClassCourseTeacherController } from './class-course_teacher.controller';

@Module({
  controllers: [ClassCourseTeacherController],
  providers: [ClassCourseTeacherService],
})
export class ClassCourseTeacherModule {}
