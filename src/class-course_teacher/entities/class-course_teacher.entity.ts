import { ClassCourse } from "src/class_course/entities/class_course.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClassCourseTeacher {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ClassCourse, (classCourse) => classCourse.classCourseTeachers)
    classCourse: ClassCourse;

    @ManyToOne(() => Teacher, (teacher) => teacher.classCourseTeachers)
    teacher: Teacher;


}
