import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { StudentModule } from 'src/student/student.module';
import { ClassRepository } from 'src/repository/class.repository';
import { ClassCourseRepository } from 'src/repository/class_course.repository';

@Module({
  imports: [StudentModule],
  controllers: [TeacherController],
  providers: [TeacherService,TeacherRepository,ClassRepository,ClassCourseRepository],
  exports: [TeacherService],
})
export class TeacherModule {}
