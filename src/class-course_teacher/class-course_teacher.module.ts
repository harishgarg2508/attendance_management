import { Module } from '@nestjs/common';
import { ClassCourseTeacherService } from './class-course_teacher.service';
import { ClassCourseTeacherController } from './class-course_teacher.controller';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { ClassCourseTeacherRepository } from 'src/repository/class-course_teacher.repository';
import { ClassCourseRepository } from 'src/repository/class_course.repository';

@Module({
  controllers: [ClassCourseTeacherController],
  providers: [ClassCourseTeacherService, TeacherRepository, ClassCourseTeacherRepository,ClassCourseRepository],
  exports: [ClassCourseTeacherService],
})
export class ClassCourseTeacherModule {}
