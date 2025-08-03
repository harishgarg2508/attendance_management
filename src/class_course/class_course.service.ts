import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';
import { ClassCourseRepository } from 'src/repository/class_course.repository';
import { ClassRepository } from 'src/repository/class.repository';
import { CourseRepository } from 'src/repository/course.repository';
import { ClassCourseTeacherDto } from 'src/class/dto/course-teacher.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';
import { Course } from 'src/course/entities/course.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { ClassCourseTeacherRepository } from 'src/repository/class-course_teacher.repository';
import { ClassCourse } from './entities/class_course.entity';

@Injectable()
export class ClassCourseService {
  constructor(private readonly classCourseRepository: ClassCourseRepository,
    private readonly classRepository: ClassRepository,
    private readonly courseRepository: CourseRepository,
    private readonly classCourseTeacherRepository: ClassCourseTeacherRepository,
    private readonly dataSource: DataSource
  ) {}
  create(createClassCourseDto: CreateClassCourseDto) {
    return 'This action adds a new classCourse';
  }
  async addCourse(classId: number,courseId: number,manager:EntityManager){ {
    const classEntity = await manager.findOneBy(Class,{id: classId});
    if(!classEntity){
      throw new NotFoundException('Class not found');
    }

    const courseEntity = await manager.findOneBy(Course,{id: courseId});
    if(!courseEntity){
      throw new NotFoundException('Course not found');
    }

    const classCourseEntity = await this.classCourseRepository.addCourse(classEntity, courseEntity,manager);
    return classCourseEntity;
   
  }
}

async addClassCourse(classCourseTeacherDto: ClassCourseTeacherDto) {
  const { classId, courseId, teacherId } = classCourseTeacherDto;
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const manager = queryRunner.manager;
    const classEntity = await manager.findOneBy(Class, { id: classId });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found`);
    }
    const courseEntity = await manager.findOneBy(Course, { id: courseId });
    if (!courseEntity) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    const teacherEntity = await manager.findOne(Teacher, {
      where:{id: teacherId},
      relations: ['classCourseTeachers', 'classCourseTeachers.classCourse', 'classCourseTeachers.classCourse.classes']
    })
    if (!teacherEntity) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }
    const isTeacherAssigned = teacherEntity.classCourseTeachers.some((classCourseTeacher) => {
      return classCourseTeacher.classCourse?.classes?.id === classEntity.id;
    })
    if(isTeacherAssigned){
      throw new ForbiddenException(`Teacher with ID ${teacherId} already assigned to this${classId} class`);
    }

    const isThisCourseAlreadyAssigned = await manager.findOne(ClassCourse,{
      where: {classes: {id: classEntity.id}, course: {id: courseEntity.id}},
      relations: ['classes', 'course']
    })

    if(isThisCourseAlreadyAssigned){
      await this.classCourseTeacherRepository.updateClassCourseTeacher(isThisCourseAlreadyAssigned.id, teacherEntity.id, manager);

    }
    else{
     const newClassCourse = await this.classCourseRepository.addClassCourse(classEntity.id, courseEntity.id, manager);
      await this.classCourseTeacherRepository.addNewClassCourseTeacher(newClassCourse.id, teacherEntity.id, manager);
    }
   


    await queryRunner.commitTransaction()
    return "Course information added successfully"
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }


}
  findAll() {
    return `This action returns all classCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classCourse`;
  }

  update(id: number, updateClassCourseDto: UpdateClassCourseDto) {
    return `This action updates a #${id} classCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} classCourse`;
  }
}
