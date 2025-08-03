import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';
import { ClassCourseRepository } from 'src/repository/class_course.repository';
import { ClassRepository } from 'src/repository/class.repository';
import { CourseRepository } from 'src/repository/course.repository';
import { ClassCourseTeacherDto } from 'src/class/dto/course-teacher.dto';
import { EntityManager } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class ClassCourseService {
  constructor(private readonly classCourseRepository: ClassCourseRepository,
    private readonly classRepository: ClassRepository,
    private readonly courseRepository: CourseRepository
  ) {}
  create(createClassCourseDto: CreateClassCourseDto) {
    return 'This action adds a new classCourse';
  }
  async addCourse(classId: number,courseId: number,manager:EntityManager){ {
    const classEntity = await manager.findOneBy(Class,{id: classId});
    if(!classEntity){
      throw new NotFoundException('Class not found');
    }

    const courseEntity = await manager.findOneBy(Course,{id: courseId});
    if(!courseEntity){
      throw new NotFoundException('Course not found');
    }

    const classCourseEntity = await this.classCourseRepository.addCourse(classEntity, courseEntity,manager);
    return classCourseEntity;
   
  }
}
  findAll() {
    return `This action returns all classCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classCourse`;
  }

  update(id: number, updateClassCourseDto: UpdateClassCourseDto) {
    return `This action updates a #${id} classCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} classCourse`;
  }
}
