import { Injectable } from '@nestjs/common';
import { Class } from 'src/class/entities/class.entity';
import { ClassCourse } from 'src/class_course/entities/class_course.entity';
import { Course } from 'src/course/entities/course.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClassCourseRepository extends Repository<ClassCourse> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourse, dataSource.createEntityManager());

  }
  
  async addCourse(classEntity:Class, courseEntity:Course) {
    const classCourseEntity = this.create({
      classes: classEntity,
      course: courseEntity,
    });

    const classCourse = await this.save(classCourseEntity);

    return classCourse;
  
  
  }

}