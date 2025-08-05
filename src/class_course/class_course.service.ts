import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ClassCourseService {
  constructor(private readonly classCourseRepository: ClassCourseRepository,
    private readonly classRepository: ClassRepository,
    private readonly courseRepository: CourseRepository,
    private readonly classCourseTeacherRepository: ClassCourseTeacherRepository,
    private readonly dataSource: DataSource
  ) {}
 
  @Transactional()
  async addCourse(classId: number,courseId: number){ {
    const classEntity = await this.classRepository.findOneBy({id: classId});
    if(!classEntity){
      throw new NotFoundException('Class not found');
    }

    const courseEntity = await this.courseRepository.findOneBy({id: courseId});
    if(!courseEntity){
      throw new NotFoundException('Course not found');
    }

    const classCourseEntity = await this.classCourseRepository.addClassCourse(classEntity.id, courseEntity.id);
    return classCourseEntity;
   
  }
}

async updateClassCourse(classCourseTeacherDto: ClassCourseTeacherDto) {
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
    const alreadyAssignedToClass = await manager.findOne(ClassCourse, {where: {
        classes: { id: classId },
        classCourseTeachers: { teacher: { id: teacherId } }
      },
      relations: ['classCourseTeachers', 'classes']
    });
    if(alreadyAssignedToClass){
      throw new ForbiddenException(`Teacher with ID ${teacherId} is already assigned to class with ID ${classId}`);
    }

    const isThisCourseAlreadyAssigned = await manager.findOne(ClassCourse,{
      where: {classes: {id: classEntity.id}, course: {id: courseEntity.id}},
      relations: ['classes', 'course']
    })

    if(isThisCourseAlreadyAssigned){
      await this.classCourseTeacherRepository.updateClassCourseTeacher(isThisCourseAlreadyAssigned.id, teacherEntity.id, manager);
      return `Teacher with ID ${teacherId} is updated  to the course with ID ${courseId} in class with ID ${classId} successfully.`
    }
    else{
     const newClassCourse = await this.classCourseRepository.addClassCourse(classEntity.id, courseEntity.id);
      await this.classCourseTeacherRepository.addNewClassCourseTeacher(newClassCourse.id, teacherEntity.id);
    }
   


    await queryRunner.commitTransaction()
    return `Teacher with ID ${teacherId} assigned to the course with ID ${courseId} in class with ID ${classId} successfully.`;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }


}

}
