import { Injectable } from '@nestjs/common';
import { Course } from 'src/course/entities/course.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CourseRepository extends Repository<Course> {
  constructor(private readonly dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());

  }

}