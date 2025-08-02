import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassCourseService } from './class_course.service';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';

@Controller('class-course')
export class ClassCourseController {
  constructor(private readonly classCourseService: ClassCourseService) {}

  @Post()
  create(@Body() createClassCourseDto: CreateClassCourseDto) {
    return this.classCourseService.create(createClassCourseDto);
  }

  @Get()
  findAll() {
    return this.classCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassCourseDto: UpdateClassCourseDto) {
    return this.classCourseService.update(+id, updateClassCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classCourseService.remove(+id);
  }
}
