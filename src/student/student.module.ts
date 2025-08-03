import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from 'src/repository/student.repository';
import { ClassRepository } from 'src/repository/class.repository';

@Module({
  controllers: [StudentController],
  providers: [StudentService,StudentRepository,ClassRepository],
  exports: [StudentService],
})
export class StudentModule {}
