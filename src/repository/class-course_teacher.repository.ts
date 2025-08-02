import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassCourseTeacher } from 'src/class-course_teacher/entities/class-course_teacher.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClassCourseTeacherRepository extends Repository<ClassCourseTeacher> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourseTeacher, dataSource.createEntityManager());

  }

}