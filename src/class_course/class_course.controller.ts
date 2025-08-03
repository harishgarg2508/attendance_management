import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassCourseService } from './class_course.service';

@Controller('class-course')
export class ClassCourseController {
  constructor(private readonly classCourseService: ClassCourseService) {}

}
