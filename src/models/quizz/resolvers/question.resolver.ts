import {Args, Query, Resolver, ResolveProperty, Parent} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { Question } from 'src/models/quizz/entities/question.entity';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { QuestionService } from 'src/models/quizz/services/question.service';
import { OptionService } from 'src/models/quizz/services/option.service';
import { IPagination } from '../interfaces/pagination.interface';
import { QuestionList } from '../list/question.list';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver('Question')

export class QuestionResolver {

  constructor(
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService
  ) {}


  @Query()
  @UseGuards(GqlAuthGuard)
  async question(@Args('id', ParseIntPipe) id: number): Promise<Question> {
    return await this.questionService.findOneById(id);
  }
  

  @Query()
  @UseGuards(GqlAuthGuard)
  async questionsInfos(
    @Args('quizzId') quizzId: number,
    @Args('pagination') pagination: IPagination,
  ): Promise<QuestionList | ApolloError> {
    return this.questionService.findAllByQuizzId(quizzId, pagination);
  }


  @Query()
  @UseGuards(GqlAuthGuard)
  questions(
      @Args('quizzId') id: number,
      @Args('start') start: number,
      @Args('limit') limit: number
      ): Promise<Question[]> {

    console.log("QuestionResolver => questions() : start / limit", start, limit);

    let idsArray: number[] = [];
    
    let promise: Promise<Question[]> = new Promise((resolve, reject) => {
        
        this.questionService.findAllIdsById(id)
        .then((res) => {

            console.log("QuestionResolver => questions() : findAll", res);
    
            res.forEach((question: Question) => { 
                idsArray.push(question.id);       
            }); 

            console.log("QuestionResolver => questions() : idsArray", idsArray);

            let selectedIds: number[] = idsArray.slice(start - 1, start - 1 + limit);

            console.log("QuestionResolver => questions() : selectedIds", selectedIds);

            this.questionService.findByIds(selectedIds)
            .then((res: Question[]) => { 
                console.log("QuestionResolver => questions() : findByIds / THEN RES", res);
                resolve(res)})
            .catch((error: any) => {
                console.log("QuestionResolver => questions() : findByIds / ERROR", error);
                reject(error);
            });

        })
        .catch((error: any) => {
            console.log("QuestionResolver => questions() : findAll / ERROR", error);
        });
    
    });
    
    return promise;
  }


  @ResolveProperty("options")
  async getOptions(@Parent() question) {
    const { id } = question;
    console.log("QuizzResolver => getOptions() : questionId", id);
    return await this.optionService.findAllById(id);
  }

}