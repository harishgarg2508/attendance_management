import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassCourseSessionService } from './class-course-session.service';
import { CreateClassCourseSessionDto } from './dto/create-class-course-session.dto';
import { UpdateClassCourseSessionDto } from './dto/update-class-course-session.dto';

@Controller('class-course-session')
export class ClassCourseSessionController {
  constructor(private readonly classCourseSessionService: ClassCourseSessionService) {}

  @Post()
  create(@Body() createClassCourseSessionDto: CreateClassCourseSessionDto) {
    return this.classCourseSessionService.create(createClassCourseSessionDto);
  }

  @Get()
  findAll() {
    return this.classCourseSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classCourseSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassCourseSessionDto: UpdateClassCourseSessionDto) {
    return this.classCourseSessionService.update(+id, updateClassCourseSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classCourseSessionService.remove(+id);
  }
}
