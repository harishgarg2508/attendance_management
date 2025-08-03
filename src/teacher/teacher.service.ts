import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeacherRepository } from 'src/repository/teacher.repository';
import { AttendanceDto } from './dto/attendance.dto';
import { StudentService } from 'src/student/student.service';
import { ClassRepository } from 'src/repository/class.repository';
import { DataSource } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { Class } from 'src/class/entities/class.entity';
import { ClassCourseRepository } from 'src/repository/class_course.repository';
import { TeacherFilterDto } from './dto/teacherFilter.dto';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly studentService: StudentService,
    private readonly classRepository: ClassRepository,
    private readonly classCourseRepository: ClassCourseRepository,
    private readonly dataSource: DataSource,
  ) {}

  async updateTeacherStatus(teacherId: number) {
    const teacher = await this.teacherRepository.findOneBy({ id: teacherId });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }
    return this.teacherRepository.updateTeacherStatus(teacher);
  }

  async markAttendance(attendanceDto: AttendanceDto) {
    const { teacherId, classId, studentAttendance } = attendanceDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;

      const teacher = await manager.findOneBy(Teacher, { id: teacherId });
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }
      if (teacher.isActive === false) {
        throw new ForbiddenException(
          `Teacher with ID ${teacherId} is not active`,
        );
      }

      const classEntity = await manager.findOneBy(Class, { id: classId });
      if (!classEntity) {
        throw new NotFoundException(`Class with ID ${classId} not found`);
      }

      const classCourses = await this.classCourseRepository.findOneBy({
        classCourseTeachers: { teacher: { id: teacherId } },
        classes: { id: classEntity.id },
      });
      if (!classCourses) {
        throw new ForbiddenException(
          `Teacher with ID ${teacherId} is not assigned to class with ID ${classId}`,
        );
      }

      await this.studentService.markAttendance(
        attendanceDto.classId,
        studentAttendance,
        manager,
      );

      await this.classRepository.update(
        { id: classId },
        { sessionCount: classEntity.sessionCount + 1 },
      );

      await queryRunner.commitTransaction();

      return 'Attendance marked successfully';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async teacherInformation(teacherFilter: TeacherFilterDto) {
    return this.teacherRepository.teacherInformation(teacherFilter);
  }

  
}
