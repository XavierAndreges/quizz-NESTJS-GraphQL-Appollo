import { Controller, Post, Body, Get, Param, UseInterceptors } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { Question } from '../entities/question.entity';
import { ErrorsInterceptor } from 'src/shared/interceptor/errors.interceptor';
import { OptionService } from '../services/option.service';
import { Option } from '../entities/option.entity';
import { User } from 'src/models/user/user.entity';
import { UserService } from 'src/models/user/user.service';

@UseInterceptors(ErrorsInterceptor)
@Controller('question')
export class QuestionController {

    constructor(
        private questionService: QuestionService,
        private optionService: OptionService,
        private userService: UserService
    ) { }

    
    @Get(':id')
    async getQuestionById(@Param('id') id: number): Promise<Question> {
        return await this.questionService.findOneById(id);
        //return await this.questionService.findAllById(id);
      }


/*
    @Get(':id')
    async getQuestionById(@Param('id') id: number): Promise<Option[]> {
        return await this.optionService.findAllById(id);
    }
    */

    /*
   @Get(':mail')
   async getQuestionById(@Param('mail') mail: string): Promise<User> {
       return await this.userService.findUserByMail(mail);
       //return await this.questionService.findAllById(id);
     }
     */
}
