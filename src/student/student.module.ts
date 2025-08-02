import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from 'src/repository/student.repository';

@Module({
  controllers: [StudentController],
  providers: [StudentService,StudentRepository],
  exports: [StudentService],
})
export class StudentModule {}
