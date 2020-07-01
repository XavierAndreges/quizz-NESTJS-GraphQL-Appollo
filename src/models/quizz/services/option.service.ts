import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '../entities/option.entity';

@Injectable()
export class OptionService {

    constructor(

        @InjectRepository(Option)
        private readonly optionRepository: Repository<Option>

    ) { }

    async findAll(): Promise<Option[]> {
        return await this.optionRepository.find();
    }

    async findOneById(id: number): Promise<Option> {
        console.log("QuestionService => findOneById() : id", id);
        return await this.optionRepository.findOneOrFail(id);
    }

    async findByIds(ids: [number]): Promise<Option[]> {
        console.log("QuestionService => findByIds() : ids", ids.toString());
        return await this.optionRepository.findByIds(ids);
    }

    async findAllById(_id: number): Promise<Option[]> {
        console.log("QuestionService => findAllById() : questionId", _id);
        return await this.optionRepository.find({where: {question: {id : _id}}});
    }

    async countAllById(_id: number): Promise<number> {
        console.log("QuestionService => findAllById() : questionId", _id);
        return await this.optionRepository.count({where: {question: {id : _id}}});
    }
    

}
