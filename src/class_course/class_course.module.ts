import { Module } from '@nestjs/common';
import { ClassCourseService } from './class_course.service';
import { ClassCourseController } from './class_course.controller';
import { CourseRepository } from 'src/repository/course.repository';
import { ClassRepository } from 'src/repository/class.repository';
import { ClassCourseRepository } from 'src/repository/class_course.repository';
import { ClassCourseTeacherRepository } from 'src/repository/class-course_teacher.repository';

@Module({
  controllers: [ClassCourseController],
  providers: [ClassCourseService, ClassCourseRepository, ClassRepository, CourseRepository,ClassCourseTeacherRepository],
  exports: [ClassCourseService],
})
export class ClassCourseModule {}
