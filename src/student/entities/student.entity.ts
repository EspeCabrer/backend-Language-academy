import { Course } from 'src/course/entities/course.entity';
import { PrimaryGeneratedColumn,Column,Entity,CreateDateColumn,UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updtedAt: String
 }
