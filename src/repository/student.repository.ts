import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from 'src/student/entities/student.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private readonly dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());

  }

}