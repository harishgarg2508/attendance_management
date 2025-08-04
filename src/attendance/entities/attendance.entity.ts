import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../state.enum";
import { ClassCourseSession } from "src/class-course-session/entities/class-course-session.entity";
import { Student } from "src/student/entities/student.entity";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'enum',enum:State,default:State.UNMARKED})
    state: State

    @ManyToOne(()=> ClassCourseSession, classCourseSession => classCourseSession.attendances)
    classCourseSession: ClassCourseSession

    @ManyToOne(()=>Student, student => student.attendance)
    student: Student

    @CreateDateColumn()
    markedAt: Date
}
