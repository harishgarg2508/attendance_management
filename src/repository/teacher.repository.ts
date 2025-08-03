import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
  constructor(private readonly dataSource: DataSource) {
    super(Teacher, dataSource.createEntityManager());

  }

  async updateTeacherStatus(teacher: Teacher) {
    teacher.isActive = !teacher.isActive;
     await this.save(teacher);
     return `${teacher.name} status updated to ${teacher.isActive ? 'Active' : 'Inactive'}`;
    
  }

}