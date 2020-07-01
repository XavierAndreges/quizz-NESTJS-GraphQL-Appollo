import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Program {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar')
    @IsNotEmpty()
    title: string;

    @Column('varchar')
    @IsNotEmpty()
    logoUrl: string;

}