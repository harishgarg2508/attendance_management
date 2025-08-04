import { Module } from '@nestjs/common';
import { ClassCourseSessionService } from './class-course-session.service';
import { ClassCourseSessionController } from './class-course-session.controller';

@Module({
  controllers: [ClassCourseSessionController],
  providers: [ClassCourseSessionService],
})
export class ClassCourseSessionModule {}
