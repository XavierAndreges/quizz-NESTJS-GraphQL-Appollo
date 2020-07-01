import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramService {

    constructor(

        @InjectRepository(Program)
        private readonly programRepository: Repository<Program>,

    ) { }

    async findOneById(id: number): Promise<Program> {
        return await this.programRepository.findOneOrFail(id
            // {
            //     relations: [
            //         "questions",
            //         "questions.options"
            //     ]
            // }
        );
    }

}
