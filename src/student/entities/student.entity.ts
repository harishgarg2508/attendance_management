import { Attendance } from "src/attendance/entities/attendance.entity";
import { Class } from "src/class/entities/class.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({unique: true})
    studentId: number;

    @Column({type:'int',default:0})
    sessionAttended: number
    
    @Column({type:'int',default:0})
    sessionTotal: number


    @Column({type: 'boolean', default: true})
    isActive: boolean;

    @ManyToOne(() => Class,classes=>classes.student)
    classes: Class;

    @OneToMany(()=> Attendance, attendance => attendance.student, {cascade: true})
    attendance: Attendance[]

}
