import { Injectable } from '@nestjs/common';
import { ClassCourseSession } from 'src/class-course-session/entities/class-course-session.entity';
import { DataSource,Repository } from 'typeorm';
    

@Injectable()
export class ClassCourseSessionRepository extends Repository<ClassCourseSession> {
  constructor(private readonly dataSource: DataSource) {
    super(ClassCourseSession, dataSource.createEntityManager());
  }

  async createClassCourseSession(session_number: number, classCourseId: number) {
    const classCourseSession = this.create({
      session_number,
      classCourse: { id: classCourseId },
    });
    return await this.save(classCourseSession);
  }

}