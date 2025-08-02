import { ClassCourseTeacher } from "src/class-course_teacher/entities/class-course_teacher.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({unique: true})
    teacherId: number;

    @Column({type: 'boolean', default: true})
    isActive: boolean;

    @OneToMany(() => ClassCourseTeacher, classCourseTeacher => classCourseTeacher.teacher, {cascade: true})
    classCourseTeachers: ClassCourseTeacher[];


}
