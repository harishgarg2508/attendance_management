import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService
  ) {}

 
  @Get()
  getAdminInfo() {
    return this.adminService.getAdminInfo();
  }

  @Patch('students/:studentId/status')
  updateStudentStatus(@Param('studentId') studentId: string) {
    return this.studentService.updateStudentStatus(+studentId);
  }

  @Patch('teachers/:teacherId/status')
  updateTeacherStatus(@Param('studentId') studentId: string) {
    return this.teacherService.updateTeacherStatus(+studentId);
  }

}
