import { Class } from "src/class/entities/class.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({unique: true})
    studentId: number;

    @Column({type: 'boolean', default: true})
    isActive: boolean;

    @ManyToOne(() => Class,classes=>classes.student)
    classes: Class;
}
