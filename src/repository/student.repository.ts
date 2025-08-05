import { Injectable } from '@nestjs/common';
import { Class } from 'src/class/entities/class.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/constants';
import { StudentFilterDto } from 'src/student/dto/studentFilter.deto';
import { Student } from 'src/student/entities/student.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';


const defaultLimit = DEFAULT_LIMIT
const defaultPage = DEFAULT_PAGE



@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private readonly dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async addStudents(
    classEntity: Class,
    studentEntity: Student,
    manager: EntityManager,
  ) {
    studentEntity.classes = classEntity;
    return await manager.save(studentEntity);
  }

  async updateStudentStatus(
    isActive: boolean,
    studentId: number,
    studentName: string,
  ) {
    return await this.update({ id: studentId }, { isActive: !isActive });
  }

  async addStudentsToClass(classId: number, studentEntity: Student) {
    return this.update({ id: studentEntity.id }, { classes: { id: classId } });
  }

  async studentInformation(studentFilter: StudentFilterDto) {


    const {
      isActive,
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
      name,
      studentId,
      studentIds,
      courseId,
      classId

    } = studentFilter;
    const qb = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.classes', 'classes')
      .leftJoinAndSelect('classes.student','students')
      .leftJoinAndSelect('classes.classCourses', 'classCourses')
      .leftJoinAndSelect('classCourses.course', 'course')
      .leftJoinAndSelect('classCourses.classCourseTeachers','classCourseTeachers',);

    if (name) {
      qb.andWhere('student.name LIKE :name', { name: `%${name}%` });
    }

    if (studentId) {
      qb.andWhere('student.id = :studentId', { studentId });

    }
    if(studentIds){
      qb.andWhere('student.id IN (:...studentIds)',{studentIds})
    }

    if (isActive) {
      qb.andWhere('student.isActive = :isActive', { isActive });
    }

    if(classId ){
      qb.andWhere('classes.id = :classId', { classId })

    }

    qb.orderBy('student.id','ASC')
    qb.skip((page - 1) * limit).take(limit);
    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      total,
    };
  }
}
