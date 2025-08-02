import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassCourseTeacher } from 'src/class-course_teacher/entities/class-course_teacher.entity';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DataSource, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ClassCourseTeacherRepository extends Repository<ClassCourseTeacher> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourseTeacher, dataSource.createEntityManager());

  }

  @Transactional()
  async addClassCourseTeacher(classCourse:ClassCourse, teacher:Teacher) {
    const classCourseTeacherEntity = this.create({
      classCourse,
      teacher,
    });

    const classCourseTeacher = await this.save(classCourseTeacherEntity);

    return classCourseTeacher;
  

}
}