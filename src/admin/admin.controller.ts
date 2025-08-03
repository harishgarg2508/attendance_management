import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService
  ) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch('students/:studentId/status')
  updateStudentStatus(@Param('studentId') studentId: string) {
      return this.studentService.updateStudentStatus(+studentId);
  }

  @Patch('teachers/:teacherId/status')
  updateTeacherStatus(@Param('studentId') studentId: string) {
      return this.teacherService.updateTeacherStatus(+studentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
