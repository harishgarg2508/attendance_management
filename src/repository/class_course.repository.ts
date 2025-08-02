import { Injectable } from '@nestjs/common';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClassCourseRepository extends Repository<ClassCourse> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourse, dataSource.createEntityManager());

  }

}