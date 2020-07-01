import {Args, Query, Resolver, ResolveProperty, Parent} from '@nestjs/graphql';
import { Quizz } from 'src/models/quizz/entities/quizz.entity';
import { ParseIntPipe,UseGuards } from '@nestjs/common';
import { QuizzService } from 'src/models/quizz/services/quizz.service';
import { QuestionService } from 'src/models/quizz/services/question.service';
import { OptionService } from 'src/models/quizz/services/option.service';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver('Quizz')

export class QuizzResolver {

  constructor(
    private readonly quizzService: QuizzService,
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService
  ) {}

  /*
  @Query()
  @UseGuards(GqlAuthGuard)
  async quizz(@Args('id', ParseIntPipe) id: number): Promise<Quizz> {
    return await this.quizzService.findOneById(id);
  }
*/

  @Query()
  async quizzTest(@Args('value') value: string): Promise<string> {
    return "toto";
  }

  @ResolveProperty("questions")
  async getQuestions(@Parent() quizz) {
    const { id } = quizz;
    console.log("QuizzResolver => getQuestions() : quizzId", id);
    return await this.questionService.findAllById(id);
  }

  @ResolveProperty("totalQuestions")
  async getTotalQuestions(@Parent() quizz) {
    const { id } = quizz;
    console.log("QuizzResolver => totalQuestions() : quizzId", id);
    return await this.questionService.countAllById(id);
  }
}