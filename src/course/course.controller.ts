import { Controller, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';


@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

 @Get()
  async getCourses(@Query('classId') classId?: number) {
    return this.courseService.getCourses(classId);
  }
}
