import { QuestionService } from '../services/question.service';
import { Quizz } from '../entities/quizz.entity';
import { Controller, Post, Body, Get, Param, UseInterceptors } from '@nestjs/common';
import { QuizzService } from '../services/quizz.service';
import { ErrorsInterceptor } from '../../../shared/interceptor/errors.interceptor';

@UseInterceptors(ErrorsInterceptor)
@Controller('quizz')
export class QuizzController {

    constructor(
        private quizzService: QuizzService,
        private questionService: QuestionService
    ) { }

    @Post()
    async createQuizz(@Body() body: Quizz): Promise<Quizz> {
        return await this.quizzService.createQuizz(body);
    }

    @Get(':id')
    async getQuizzById(@Param('id') id: number): Promise<Quizz> {
        console.log("QuizzController => getQuizzById()")
      return await this.quizzService.findOneById(id);
    }
}
