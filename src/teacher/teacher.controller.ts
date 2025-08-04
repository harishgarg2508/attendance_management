import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AttendanceDto } from './dto/attendance.dto';
import { TeacherFilterDto } from './dto/teacherFilter.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}


  @Get()
  teacherInformation(@Query() teacherFilter:TeacherFilterDto) {
    return this.teacherService.teacherInformation(teacherFilter);
  }
//this route to be in attendance table
  @Patch('students/attendance')
  markAttendance(@Body() attendanceDto: AttendanceDto) {
    return this.teacherService.markAttendance(attendanceDto);
  }

}
