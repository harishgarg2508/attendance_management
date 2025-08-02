import { ClassCourse } from "src/class_course/entities/class_course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column()
    description: string;

    @OneToMany(()=> ClassCourse, classCourse => classCourse.course)
    classCourses: ClassCourse[];
}
