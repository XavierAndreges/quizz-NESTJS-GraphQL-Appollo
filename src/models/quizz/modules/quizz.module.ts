import { QuestionResolver } from '../resolvers/question.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizz } from '../entities/quizz.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { QuizzService } from '../services/quizz.service';
import { QuizzResolver } from '../resolvers/quizz.resolver';
import { QuestionService } from 'src/models/quizz/services/question.service';
import { OptionService } from 'src/models/quizz/services/option.service';
import { OptionResolver } from 'src/models/quizz/resolvers/option.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Quizz, Question, Option])],
  providers: [
    QuizzService, 
    QuestionService,
    OptionService,
    QuizzResolver,
    QuestionResolver,
    OptionResolver
  ],
  controllers: []
})
export class QuizzModule {}
