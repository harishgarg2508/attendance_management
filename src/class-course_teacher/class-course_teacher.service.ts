import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassCourseRepository } from 'src/repository/class_course.repository';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { ClassCourseTeacherRepository } from 'src/repository/class-course_teacher.repository';
import { EntityManager } from 'typeorm';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ClassCourseTeacherService {
  constructor(private readonly classCourseRepository: ClassCourseRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly classCourseTeacherRepository: ClassCourseTeacherRepository
  ) {}
 


  @Transactional()
  async addClassCourseTeacher(classCourseId: number, teacherId: number){ {
      const classCourse = await this.classCourseRepository.findOneBy({id: classCourseId});
      if(!classCourse){
        throw new NotFoundException('Class Course not found');
      }
      const teacher = await this.teacherRepository.findOneBy({id: teacherId});
      if(!teacher){
        throw new NotFoundException('Teacher not found');
      }

    const classCourseTeacher = await this.classCourseTeacherRepository.addClassCourseTeacher(classCourse, teacher);
      
    return classCourseTeacher;
  }
}

}
