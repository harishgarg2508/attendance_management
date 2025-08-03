import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherFilterDto } from 'src/teacher/dto/teacherFilter.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
  constructor(private readonly dataSource: DataSource) {
    super(Teacher, dataSource.createEntityManager());

  }

  async updateTeacherStatus(teacher: Teacher) {
    teacher.isActive = !teacher.isActive;
     await this.save(teacher);
     return `${teacher.name} status updated to ${teacher.isActive ? 'Active' : 'Inactive'}`;
    
  }

  async teacherInformation(teacherFilter: TeacherFilterDto){
        const DEFAULT_LIMIT = Number(process.env.LIMIT);
        const DEFAULT_PAGE = Number(process.env.PAGE);
    
        const {
          isActive,
          page = DEFAULT_PAGE,
          limit = DEFAULT_LIMIT,
          name,
          teacherId,
          teacherIds
        } = teacherFilter;
        const qb = this.createQueryBuilder('teacher')
          .leftJoinAndSelect('teacher.classCourseTeachers', 'classCourseTeachers')
          .leftJoinAndSelect('classCourseTeachers.classCourse', 'classCourse')
          .leftJoinAndSelect('classCourse.course', 'course')
          .leftJoinAndSelect('classCourse.classes', 'classes')
         

    
        if (name) {
          qb.andWhere('teacher.name LIKE :name', { name: `%${name}%` });
        }
    
        if (teacherId) {
          qb.andWhere('teacher.id = :teacherId', { teacherId });
        }
        if(teacherIds){
          qb.andWhere('teacher.id IN (:...teacherIds)',{teacherIds})
        }
    
        if (isActive) {
          qb.andWhere('teacher.isActive = :isActive', { isActive });
        }
    
        qb.orderBy('teacher.id', 'ASC')
        qb.skip((page - 1) * limit).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return {
          data,
          total,
        };
      }
  }

