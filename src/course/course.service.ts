import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/repository/course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async getCourses(classId?: number) {
    return this.courseRepository.getCourses(classId);
  }
}
