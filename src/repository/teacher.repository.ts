import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
  constructor(private readonly dataSource: DataSource) {
    super(Teacher, dataSource.createEntityManager());

  }

}