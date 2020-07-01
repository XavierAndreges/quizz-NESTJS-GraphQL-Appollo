import { Question } from './question.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Quizz {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar')
    title: string;

    @Column('int')
    version: number;

    @Column('longtext')
    description: string;

    @Column('date')
    lastUpdate: Date;

    @Column('date')
    creationDate: Date;

    @Column('int')
    creatorIdUser: number;

    @Column('int')
    idCategory: number;

    @Column({
        type: "varchar",
        length: 250
    })
    requirement: string;

    @Column('int')
    duration: number;

    @OneToMany(type => Question, (question: Question) => question.quizz)
    questions: Question[];
    
}