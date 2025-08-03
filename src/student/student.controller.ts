import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentFilterDto } from './dto/studentFilter.deto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  @Get()
  studentInformation(@Query() studentFilter:StudentFilterDto) {
    return this.studentService.studentInformation(studentFilter);
  }

}
