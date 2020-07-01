import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Option } from '../quizz/entities/option.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 45
    })
    @IsNotEmpty()
    mail: string;

    @Column({
        type: "varchar",
        length: 45
    })
    @IsNotEmpty()
    firstName: string;

    @Column({
        type: "varchar",
        length: 45
    })
    @IsNotEmpty()
    lastName: string;

    @Column({
        type: "varchar",
        length: 45
    })
    @IsNotEmpty()
    password: string;

    @Column({
        type: "varchar",
        length: 45
    })
    @IsNotEmpty()
    photoUrl: string;

    @Column('double')
    @IsNotEmpty()
    lastConnectionDate: number;

    @Column('double')
    @IsNotEmpty()
    creationDate: number;

    @Column({
        type: "varchar",
        length: 45
    })
    @IsNotEmpty()
    roleName: string;
  
    @ManyToMany(type => Option, {
        cascade: true
    })
    @JoinTable()
    options?: Option[];
}