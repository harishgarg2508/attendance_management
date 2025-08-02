import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassCourseTeacherService } from './class-course_teacher.service';
import { CreateClassCourseTeacherDto } from './dto/create-class-course_teacher.dto';
import { UpdateClassCourseTeacherDto } from './dto/update-class-course_teacher.dto';

@Controller('class-course-teacher')
export class ClassCourseTeacherController {
  constructor(private readonly classCourseTeacherService: ClassCourseTeacherService) {}

  @Post()
  create(@Body() createClassCourseTeacherDto: CreateClassCourseTeacherDto) {
    return this.classCourseTeacherService.create(createClassCourseTeacherDto);
  }

  @Get()
  findAll() {
    return this.classCourseTeacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classCourseTeacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassCourseTeacherDto: UpdateClassCourseTeacherDto) {
    return this.classCourseTeacherService.update(+id, updateClassCourseTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classCourseTeacherService.remove(+id);
  }
}
