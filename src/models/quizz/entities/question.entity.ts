import { Option } from './option.entity';
import { Quizz } from './quizz.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 1000
    })
    question: string;

    @Column('varchar')
    annex: string;

    @Column('int')
    score: number;

    @Column('int')
    idCategory: number;

    @ManyToOne(type => Quizz, (quizz: Quizz) => quizz.questions)
    quizz?: Quizz;

    @OneToMany(type => Option, (option: Option) => option.question)
    options?: Option[];

}