import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassCourseTeacherDto } from './dto/create-class-course_teacher.dto';
import { UpdateClassCourseTeacherDto } from './dto/update-class-course_teacher.dto';
import { ClassCourseRepository } from 'src/repository/class_course.repository';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { ClassCourseTeacherRepository } from 'src/repository/class-course_teacher.repository';
import { EntityManager } from 'typeorm';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class ClassCourseTeacherService {
  constructor(private readonly classCourseRepository: ClassCourseRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly classCourseTeacherRepository: ClassCourseTeacherRepository
  ) {}
  create(createClassCourseTeacherDto: CreateClassCourseTeacherDto) {
    return 'This action adds a new classCourseTeacher';
  }

  
  async addClassCourseTeacher(classCourseId: number, teacherId: number, manager:EntityManager){ {
      const classCourse = await manager.findOneBy(ClassCourse,{id: classCourseId});
      if(!classCourse){
        throw new NotFoundException('Class Course not found');
      }
      const teacher = await manager.findOneBy(Teacher,{id: teacherId});
      if(!teacher){
        throw new NotFoundException('Teacher not found');
      }

    const classCourseTeacher = await this.classCourseTeacherRepository.addClassCourseTeacher(classCourse, teacher,manager);
      
    return classCourseTeacher;
  }
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
