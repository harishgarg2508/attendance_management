import { Admin } from "src/admin/entities/admin.entity";
import { ClassCourse } from "src/class_course/entities/class_course.entity";
import { Student } from "src/student/entities/student.entity";
import {  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    standard: string;

    @Column()
    academicYear: string;

    @OneToMany(()=> ClassCourse, classCourse => classCourse.classes, {cascade: true})
    classCourses: ClassCourse[];

    @OneToMany(() => Student, student => student.classes, {cascade: true})
    student: Student[];

    @ManyToOne(() => Admin, admin => admin.classes)
    admin: Admin;

}
