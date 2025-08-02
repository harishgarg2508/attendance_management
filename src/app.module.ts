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
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    AdminModule,
    StudentModule,
    TeacherModule,
    ClassModule,
    CourseModule,
    ClassCourseModule,
    ClassCourseTeacherModule,
    
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions; 
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}