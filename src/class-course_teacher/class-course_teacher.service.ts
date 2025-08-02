import { Injectable } from '@nestjs/common';
import { CreateClassCourseTeacherDto } from './dto/create-class-course_teacher.dto';
import { UpdateClassCourseTeacherDto } from './dto/update-class-course_teacher.dto';

@Injectable()
export class ClassCourseTeacherService {
  create(createClassCourseTeacherDto: CreateClassCourseTeacherDto) {
    return 'This action adds a new classCourseTeacher';
  }

  findAll() {
    return `This action returns all classCourseTeacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classCourseTeacher`;
  }

  update(id: number, updateClassCourseTeacherDto: UpdateClassCourseTeacherDto) {
    return `This action updates a #${id} classCourseTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} classCourseTeacher`;
  }
}
