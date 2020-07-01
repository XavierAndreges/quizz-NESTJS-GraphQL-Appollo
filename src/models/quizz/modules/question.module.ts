import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { QuestionService } from '../services/question.service';
import { QuestionController } from '../controller/question.controller';
import { OptionService } from '../services/option.service';
import { Option } from '../entities/option.entity';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Question, Option, User])],
    providers: [
      QuestionService,
      OptionService,
      UserService],
    controllers: [QuestionController]
  })

export class QuestionModule {}
