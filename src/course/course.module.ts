import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from 'src/repository/course.repository';

@Module({
  controllers: [CourseController],
  providers: [CourseService,CourseRepository],
})
export class CourseModule {}
