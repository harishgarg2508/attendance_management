import { Module } from '@nestjs/common';
import { ClassCourseService } from './class_course.service';
import { ClassCourseController } from './class_course.controller';

@Module({
  controllers: [ClassCourseController],
  providers: [ClassCourseService],
})
export class ClassCourseModule {}
