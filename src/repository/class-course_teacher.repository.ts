import { Injectable } from '@nestjs/common';
import { ClassCourseTeacher } from 'src/class-course_teacher/entities/class-course_teacher.entity';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ClassCourseTeacherRepository extends Repository<ClassCourseTeacher> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourseTeacher, dataSource.createEntityManager());
  }

  @Transactional()
  async addClassCourseTeacher(
    classCourse: ClassCourse,
    teacher: Teacher,
    // manager: EntityManager,
  ) {
    {
      const classCourseTeacherEntity = this.create( {
        classCourse,
        teacher,
      });

      const classCourseTeacher = await this.save(classCourseTeacherEntity);

      return classCourseTeacher;
    }
  }

  async updateClassCourseTeacher(classCourseId: number,teacherId: number,manager: EntityManager,) {
    return await manager.update(
      ClassCourseTeacher,
      { classCourse: { id: classCourseId }},
      { teacher: { id: teacherId } },
    );
  }

  async addNewClassCourseTeacher(classCourseId: number, teacherId: number){ 
    const newClassCourseTeacher = this.create({
      classCourse: { id: classCourseId },
      teacher: { id: teacherId },
    
    })
    await this.save(newClassCourseTeacher);
    return newClassCourseTeacher;
  }
    
}
