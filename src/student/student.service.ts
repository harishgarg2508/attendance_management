import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from 'src/repository/student.repository';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository,) {}
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }
    
  
  async addStudent(classEntity: Class, studentId: number) {
    const student = await this.studentRepository.findOneBy({id: studentId});
    if(!student) throw new NotFoundException(`student with id ${studentId} not found`);

    return this.studentRepository.addStudents(classEntity, student);
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
