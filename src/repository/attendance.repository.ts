import { Injectable } from '@nestjs/common';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { State } from 'src/attendance/state.enum';
import { DataSource,Entity,Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
    


@Injectable()
export class AttendanceRepository extends Repository<Attendance> {
  constructor(private readonly dataSource: DataSource) {
    super(Attendance, dataSource.createEntityManager());
  }

  @Transactional()
  async markAttendance(classCourseSessionId: number, studentId: number, attendance_status: State){
    const attendance = this.create({
      
      classCourseSession: { id: classCourseSessionId },
      student: { id: studentId },
      state: attendance_status,
     
    });
    return await this.save(attendance);

      
  }

}