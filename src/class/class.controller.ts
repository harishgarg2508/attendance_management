import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassCourseService } from 'src/class_course/class_course.service';
import { AddStudentDto } from './dto/student.dto';
import { StudentService } from 'src/student/student.service';
import { FilterDto } from './dto/filter.dto';
import { ClassCourseTeacherDto } from './dto/course-teacher.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService,
   private readonly classCourseService: ClassCourseService,
   private readonly studentService: StudentService
  ) {}

  @Post()
  createClass(@Body() createClassDto: CreateClassDto) {
    return this.classService.createClass(createClassDto);
  }

  @Get()
  getClassInformation(@Query() filters: FilterDto) {
    return this.classService.getClassInformation(filters);
  }

  @Patch('students')
  addStudetsToClass(@Body() addStudentDto:AddStudentDto) {
    return this.studentService.addStudetsToClass(addStudentDto);
  }

  @Patch('courses')
  addClassCourse(@Body() classCourseTeacherDto: ClassCourseTeacherDto) {
    return this.classCourseService.addClassCourse(classCourseTeacherDto);
  }

}
