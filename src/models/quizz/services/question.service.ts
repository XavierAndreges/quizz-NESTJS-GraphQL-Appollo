import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Question } from '../entities/question.entity';
import { IPagination } from '../interfaces/pagination.interface';
import { QuestionList } from '../list/question.list';
import { BddService } from 'src/shared/services/bdd.service';

@Injectable()
export class QuestionService extends BddService {

    constructor(
        @InjectRepository(Question)
         private readonly questionRepository: Repository<Question>
    ) { super() }

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.find();
    }

    async findOneById(id: number): Promise<Question> {
        console.log("QuestionService => findOneById() : id", id);
        return await this.questionRepository.findOneOrFail(id);
    }

    async findByIds(ids: number[]): Promise<Question[]> {
        console.log("QuestionService => findByIds() : ids", ids.toString());
        return await this.questionRepository.findByIds(ids);
    }

    async findAllById(_id: number): Promise<Question[]> {
        console.log("QuestionService => findAllById() : quizzId", _id);
        return await this.questionRepository.find({where: { quizz : {id : _id}}});
    }

    async findAllIdsById(_id: number): Promise<Question[]> {
        console.log("QuestionService => findAllIdsById() : quizzId", _id);
        return await this.questionRepository.find({select: ["id"], where: { quizz : {id : _id}}});
    }

    async countAllById(_id: number): Promise<number> {
        console.log("QuestionService => findAllById() : quizzId", _id);
        return await this.questionRepository.count({where: { quizz : {id : _id}}});
    }
    
    public async findAllByQuizzId(
        quizzId: number,
        pagination: IPagination,
      ): Promise<QuestionList | ApolloError> {
          try {
            console.log("QuestionService => findAllByQuizzId() : quizzId", quizzId);
            return await this.findStockList({ where: { quizz: { id : quizzId } } }, pagination);
          } catch (e) {
              return new ApolloError('An error occured : ' + e, '500');
          }
      }
    
      public async findStockList(findOptions: FindManyOptions<Question>, pagination: IPagination): Promise<QuestionList> {
        this.applyPagination(findOptions, pagination);
        console.log("QuestionService => findStockList() : applyPagination / findOptions", findOptions);
        const questions: [Question[], number] = await this.questionRepository.findAndCount(findOptions);
        console.log("QuestionService => findStockList() : questions", questions);
        let result = new QuestionList(this.buildPageInfos(questions[1], pagination), questions[0]);
        console.log("QuestionService => findStockList() : buildPageInfos / questionList", result);
        return result;
      }
}
