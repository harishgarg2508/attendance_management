import { Class } from "src/class/entities/class.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({unique: true})
    adminId: number;

    @OneToMany(()=>Class, classEntity => classEntity.admin)
    classes:Class[];



}
