import { Module } from '@nestjs/common';
import { ClassCourseService } from './class_course.service';
import { ClassCourseController } from './class_course.controller';
import { CourseRepository } from 'src/repository/course.repository';
import { ClassRepository } from 'src/repository/class.repository';
import { ClassCourseRepository } from 'src/repository/class_course.repository';

@Module({
  controllers: [ClassCourseController],
  providers: [ClassCourseService, ClassCourseRepository, ClassRepository, CourseRepository],
  exports: [ClassCourseService],
})
export class ClassCourseModule {}
