import { Injectable } from '@nestjs/common';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ClassCourseRepository extends Repository<ClassCourse> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourse, dataSource.createEntityManager());
  }

  @Transactional()
  async addClassCourse(
    classId: number,
    courseId: number,
    // manager: EntityManager,
  ) {
    const newClassCourse = this.create( {
      classes: { id: classId },
      course: { id: courseId },
    });
    return await this.save(newClassCourse);
  }
}
