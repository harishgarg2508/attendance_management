import { Attendance } from "src/attendance/entities/attendance.entity";
import { ClassCourse } from "src/class_course/entities/class_course.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClassCourseSession {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    session_number: number

    @ManyToOne(()=> ClassCourse, classCourse => classCourse.classCourseSessions)
    classCourse: ClassCourse

    @OneToMany(()=>Attendance, attendance => attendance.classCourseSession)
    attendances: Attendance[]

}
