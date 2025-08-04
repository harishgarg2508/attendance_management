import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassModule } from './class/class.module';
import { CourseModule } from './course/course.module';
import { ClassCourseModule } from './class_course/class_course.module';
import { ClassCourseTeacherModule } from './class-course_teacher/class-course_teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/datasource';
import { AttendanceModule } from './attendance/attendance.module';
import { ClassCourseSessionModule } from './class-course-session/class-course-session.module';

@Module({
  imports: [
    AdminModule,
    StudentModule,
    TeacherModule,
    ClassModule,
    CourseModule,
    ClassCourseModule,
    ClassCourseTeacherModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AttendanceModule,
    ClassCourseSessionModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
