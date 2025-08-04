import { Injectable } from '@nestjs/common';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class ClassCourseRepository extends Repository<ClassCourse> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourse, dataSource.createEntityManager());
  }

  async addClassCourse(
    classId: number,
    courseId: number,
    manager: EntityManager,
  ) {
    const newClassCourse = manager.create(ClassCourse, {
      classes: { id: classId },
      course: { id: courseId },
    });
    return await manager.save(newClassCourse);
  }
}
