import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from 'src/admin/entities/admin.entity';
import { CreateClassDto } from 'src/class/dto/create-class.dto';
import { FilterDto } from 'src/class/dto/filter.dto';
import { Class } from 'src/class/entities/class.entity';
import { DataSource, EntityManager, Filter, Repository } from 'typeorm';

@Injectable()
export class ClassRepository extends Repository<Class> {
  constructor(private readonly dataSource: DataSource) {
    super(Class, dataSource.createEntityManager());
  }

  async createClass(
    createClassDto: CreateClassDto,
    admin: Admin,
    manager: EntityManager,
  ): Promise<Class> {
    const classEntity = manager.create(Class, {
      ...createClassDto,
      admin,
    });

    const classData = await manager.save(classEntity);
    return classData;
  }

  async getClassInformation(filters: FilterDto) {
    const { classId, courseId, page = 1, limit = 10 } = filters;

    const qb = this.createQueryBuilder('class')
      .leftJoinAndSelect('class.student', 'student')
      .leftJoinAndSelect('class.classCourses', 'classCourses')
      .leftJoinAndSelect('classCourses.course', 'course')
      .leftJoinAndSelect(
        'classCourses.classCourseTeachers',
        'classCourseTeachers',
      )
      .leftJoinAndSelect('classCourseTeachers.teacher', 'teacher');

    if (classId) {
      qb.where('class.id = :classId', { classId });
    }

    if (courseId) {
      qb.andWhere('course.id = :courseId', { courseId });
    }

    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
