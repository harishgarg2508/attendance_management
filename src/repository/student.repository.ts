import { Injectable, NotFoundException } from '@nestjs/common';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private readonly dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());

  }
  
  async addStudents(classEntity: Class, studentEntity: Student) {
    studentEntity.classes = classEntity;
    return await this.save(studentEntity);
  }



}