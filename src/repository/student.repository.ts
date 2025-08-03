  import { Injectable, NotFoundException } from '@nestjs/common';
  import { Class } from 'src/class/entities/class.entity';
  import { Student } from 'src/student/entities/student.entity';
  import { DataSource, EntityManager, Repository } from 'typeorm';

  @Injectable()
  export class StudentRepository extends Repository<Student> {
    constructor(private readonly dataSource: DataSource) {
      super(Student, dataSource.createEntityManager());

    }
    
    async addStudents(classEntity: Class, studentEntity: Student,manager:EntityManager){ 
      studentEntity.classes = classEntity;
      return await manager.save(studentEntity);
    }

    async updateStudentStatus(isActive: boolean, studentId: number,studentName: string) {
      return await this.update({ id: studentId }, { isActive: !isActive });

    }

    async addStudentsToClass(classId: number, studentEntity: Student) {
     return this.update({id:studentEntity.id},{classes:{id:classId}})
    }
      
  }