import { ClassCourseSession } from 'src/class-course-session/entities/class-course-session.entity';
import { ClassCourseTeacher } from 'src/class-course_teacher/entities/class-course_teacher.entity';
import { Class } from 'src/class/entities/class.entity';
import { Course } from 'src/course/entities/course.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.classCourses)
  course: Course;

  @ManyToOne(() => Class, classes => classes.classCourses)
  classes: Class;

  @OneToMany(()=>ClassCourseTeacher, classCourseTeacher => classCourseTeacher.classCourse, {cascade: true},)
  classCourseTeachers: ClassCourseTeacher[];

  @OneToMany(() => ClassCourseSession, classCourseSession => classCourseSession.classCourse,)
  classCourseSessions: ClassCourseSession[]

}
