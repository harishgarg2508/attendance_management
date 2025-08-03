import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from 'src/repository/student.repository';
import { Class } from 'src/class/entities/class.entity';
import { EntityManager } from 'typeorm';
import { Student } from './entities/student.entity';
import {
  AttendanceStatus,
  StudentAttendanceDto,
} from 'src/teacher/dto/studentAttendance.dto';
import { AddStudentDto } from 'src/class/dto/student.dto';
import { ClassRepository } from 'src/repository/class.repository';
import { StudentFilterDto } from './dto/studentFilter.deto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly classRepository: ClassRepository,
  ) {}


  async addStudent(
    classEntity: Class,
    studentId: number,
    manager: EntityManager,
  ) {
    const student = await manager.findOne(Student, {
      where: { id: studentId },
      relations: ['classes'],
    });
    if (!student) {
      throw new NotFoundException(`student with id ${studentId} not found`);
    }
    if(student.classes.id){
      throw new ForbiddenException(`student ${student.name} with id ${student.id} already added to class ${student.classes.standard}`);
    }


    return this.studentRepository.addStudents(classEntity, student, manager);
  }

  async updateStudentStatus(studentId: number) {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`student with id ${studentId} not found`);
    }

    const result = await this.studentRepository.updateStudentStatus(
      student.isActive,
      student.id,
      student.name,
    );

    if (!result.affected) {
      throw new NotFoundException(`student with id ${studentId} not found`);
    }

    const newStatus = !student.isActive;

    return `${student.name} status updated to ${newStatus ? 'Active' : 'Inactive'}`;
  }

  async markAttendance(
    classId: number,
    studentAttendance: StudentAttendanceDto[],
    manager: EntityManager,
  ) {
    const classEntity = await this.classRepository.findOneBy({ id: classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    for (const attendance of studentAttendance) {
      const student = await manager.findOne(Student, {
        where: { id: attendance.studentId },
        relations: ['classes'],
      });
      
      if (!student) {
        throw new NotFoundException(
          `Student with ID ${attendance.studentId} not found`,
        );
      }
      if (student.isActive === false) {
        throw new ForbiddenException(
          `Student ${student.name} with ID ${student.id} is not active`,
        );
      }

      if (classEntity.id !== student.classes.id) {
        throw new ForbiddenException(
          `Student ${student.name} with ID ${student.id} is not in class ${classId}`,
        );
      }
      student.sessionTotal += 1;
      if (AttendanceStatus.PRESENT === attendance.status) {
        student.sessionAttended += 1;
      }
      await manager.save(student);
    }
  }

  async updateStudetsInClass(addStudentDto: AddStudentDto) {
    const { classId, students } = addStudentDto;
    const classEntity = await this.classRepository.findOneBy({ id: classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }
    for (const student of students) {
      const studentEntity = await this.studentRepository.findOne({
        where:{id: student.studentId},
        relations:['classes']
      });
      if (!studentEntity) {
        throw new NotFoundException(
          `Student with id ${student.studentId} not found`,
        );
      }
      if (studentEntity.classes?.id === classEntity.id) {
        throw new ForbiddenException(
          `Student ${studentEntity.name} with id ${studentEntity.id} already added to class ${studentEntity.classes.standard}`,
        );
      }
      await this.studentRepository.addStudentsToClass(
        classEntity.id,
        studentEntity,
      );

    }
    return 'Students added to class successfully';
  }

  async studentInformation(studentFilter: StudentFilterDto) {
    return this.studentRepository.studentInformation(studentFilter);
  }

}
