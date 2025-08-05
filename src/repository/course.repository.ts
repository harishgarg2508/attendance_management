import { Injectable } from '@nestjs/common';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/constants';
import { Course } from 'src/course/entities/course.entity';
import { DataSource, Repository } from 'typeorm';
const defaultLimit = DEFAULT_LIMIT
const defaultPage = DEFAULT_PAGE
@Injectable()
export class CourseRepository extends Repository<Course> {
  constructor(private readonly dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());

  }
  async getCourses(classId?: number) {
  const qb = this.createQueryBuilder('course')
    .innerJoinAndSelect('course.classCourses', 'classCourse') // inner join: filter only matching
    .innerJoinAndSelect('classCourse.classes', 'class') // if you want class info too
    .orderBy('course.id', 'ASC');

  if (classId) {
    qb.where('class.id = :classId', { classId }); // use alias 'class'
  }

  qb.skip((defaultPage - 1) * defaultLimit).take(defaultLimit);

  const [data, total] = await qb.getManyAndCount();

  return {
    data,
    total,
    page: defaultPage,
    limit: defaultLimit,
  };
}

}