import {Args, Query, Resolver, ResolveProperty, Parent} from '@nestjs/graphql';

import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Quizz } from '../entities/quizz.entity';
import { ParseIntPipe,UseGuards } from '@nestjs/common';
import { QuizzService } from '../services/quizz.service';
import { QuestionService } from '../services/question.service';
import { OptionService } from '../services/option.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzResolver } from '../resolvers/quizz.resolver';

describe('Quizz Resolver', () => {

    console.log('describe outer-a');
    
    let resolver: QuizzResolver;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forFeature([Quizz, Question, Option])],
        providers: [
            QuizzService, 
            QuestionService,
            OptionService,
            QuizzResolver
        ],
        }).compile();
        //await module.init();

        resolver = module.get<QuizzResolver>(QuizzResolver);
    });

    test('1 = 1', () => {
        expect(1).toEqual(1);
    });

    test('2 = 2', () => {
        expect(2).toEqual(2);
    });
  
    test('quizztest', async () => {
        const quizzId = await resolver.quizzTest("tata");
        expect(quizzId).toEqual("toto");
    });

    //https://github.com/nzaghini/graphql-server-addc-2018

    https://onlineornot.com/blog/onlineornot-graphql-snapshot-testing

});