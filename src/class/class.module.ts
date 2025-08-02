import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from 'src/repository/class.repository';
import { AdminRepository } from 'src/repository/admin.repository';
import { ClassCourseModule } from 'src/class_course/class_course.module';
import { ClassCourseTeacherModule } from 'src/class-course_teacher/class-course_teacher.module';
import { StudentRepository } from 'src/repository/student.repository';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [ClassCourseModule,ClassCourseTeacherModule,StudentModule],
  controllers: [ClassController],
  providers: [ClassService,ClassRepository,AdminRepository,StudentRepository],
})
export class ClassModule {}
