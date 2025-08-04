import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceRepository } from 'src/repository/attendance.repository';
import { StudentRepository } from 'src/repository/student.repository';
import { ClassRepository } from 'src/repository/class.repository';
import { ClassCourseSessionRepository } from 'src/repository/class-course-session.repository';
import { ClassCourseRepository } from 'src/repository/class_course.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendenceRepository: AttendanceRepository,
    private readonly studentRepository: StudentRepository,
    private readonly classRepository: ClassRepository,
    private readonly classCourseRepository: ClassCourseRepository,
    private readonly classCourseSessionRepository: ClassCourseSessionRepository
  ) {}

    @Transactional()
    async  markAttendance(createAttendanceDto: CreateAttendanceDto) {
      const { studentId, classId, session_Number,courseId,attendance_status } = createAttendanceDto;
      
      const student = await this.studentRepository.findOne({
        where:{id:studentId},
        relations:['classes']
      });


      if(!student){
        throw new NotFoundException('Student not found');
      }

       if (!student.classes || student.classes.id !== classId) {
      throw new NotFoundException(`Student with ID ${studentId} is not in class with ID ${classId}`);
    }
      const classCourse = await this.classCourseRepository.findOne({
       
        where:{classes:{id:classId},course:{id:courseId}}

      })
      if(!classCourse){
        throw new NotFoundException(`Class with ID ${classId} having course with ID ${courseId} not found`);      
      
      }

      const isAlreadyMarked = await this.classCourseSessionRepository.findOne({
        where: {
          classCourse: { id: classCourse.id },
          session_number: session_Number
        },
      })

      if(isAlreadyMarked){
        throw new ConflictException(`Attendance of studetnt with ID ${studentId} for session number ${session_Number} is already marked for class with ID ${classId} and course with ID ${courseId}`);
      }

      const classCourseSession = await this.classCourseSessionRepository.createClassCourseSession(session_Number,classCourse.id)

        
      await this.attendenceRepository.markAttendance(classCourseSession.id, studentId, attendance_status );

      return "attendance marked successfully";
    
  }

  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
