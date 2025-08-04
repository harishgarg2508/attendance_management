import { Injectable } from '@nestjs/common';
import { CreateClassCourseSessionDto } from './dto/create-class-course-session.dto';
import { UpdateClassCourseSessionDto } from './dto/update-class-course-session.dto';

@Injectable()
export class ClassCourseSessionService {
  create(createClassCourseSessionDto: CreateClassCourseSessionDto) {
    return 'This action adds a new classCourseSession';
  }

  findAll() {
    return `This action returns all classCourseSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classCourseSession`;
  }

  update(id: number, updateClassCourseSessionDto: UpdateClassCourseSessionDto) {
    return `This action updates a #${id} classCourseSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} classCourseSession`;
  }
}
