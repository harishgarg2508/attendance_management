import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AttendanceRepository } from 'src/repository/attendance.repository';
import { StudentRepository } from 'src/repository/student.repository';
import { ClassRepository } from 'src/repository/class.repository';
import { ClassCourseSessionRepository } from 'src/repository/class-course-session.repository';
import { ClassCourseRepository } from 'src/repository/class_course.repository';

@Module({
  controllers: [AttendanceController],
  providers: [
    AttendanceService,
    AttendanceRepository,
    StudentRepository,
    ClassRepository,
    ClassCourseSessionRepository,
    ClassCourseRepository
  ],
})
export class AttendanceModule {}
