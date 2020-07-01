import { Question } from './question.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Option {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 1000
    })
    titleOption: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(type => Question, (question: Question) => question.options)
    question?: Question;
}