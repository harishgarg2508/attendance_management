import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassRepository } from 'src/repository/class.repository';
import { AdminRepository } from 'src/repository/admin.repository';
import { ClassCourseService } from 'src/class_course/class_course.service';
import { DataSource, Filter } from 'typeorm';
import { ClassCourseTeacherService } from 'src/class-course_teacher/class-course_teacher.service';
import { StudentRepository } from 'src/repository/student.repository';
import { StudentService } from 'src/student/student.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class ClassService {
  constructor(
    private readonly classRepository: ClassRepository,
    private readonly adminRepository: AdminRepository,
    private readonly classCourseService: ClassCourseService,
    private readonly ClassCourseTeacherService: ClassCourseTeacherService,
    private readonly studentService: StudentService,
    private readonly studentRepository: StudentRepository,
    private dataSource: DataSource,
  ) {}

  
  async createClass(createClassDto: CreateClassDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const manager = queryRunner.manager;
      const admin = await manager.findOneBy(Admin,{
        id: createClassDto.adminId,

      });
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      

      const classEntity = await this.classRepository.createClass(
        createClassDto,
        admin,
        manager,
      );
      const classId = classEntity.id;

      for(const student of createClassDto.students){
    
        const studentData = await this.studentService.addStudent(classEntity, student.studentId,manager);
             
        
      }

      for (const courseTeacher of createClassDto.courseTeacher) {
        const classCourse = await this.classCourseService.addCourse(
          classId,
          courseTeacher.courseId,
          manager,
        );
        const classCourseTeacher =
          await this.ClassCourseTeacherService.addClassCourseTeacher(
            classCourse.id,
            courseTeacher.teacherId,
            manager,
          );
      }

      await queryRunner.commitTransaction();
      return {
        message: 'Class created successfully',
        class: classEntity,
        courseTeacher: createClassDto.courseTeacher,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getClassInformation(filters:FilterDto){
     return this.classRepository.getClassInformation(filters);
   
  }

  findAll() {
    return `This action returns all class`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
