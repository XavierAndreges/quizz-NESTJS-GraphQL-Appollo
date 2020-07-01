import { Option } from '../entities/option.entity';
import { Question } from '../entities/question.entity';
import { Quizz } from '../entities/quizz.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzService {

    constructor(

        @InjectRepository(Quizz)
        private readonly quizzRepository: Repository<Quizz>,

        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,

        @InjectRepository(Option)
        private readonly optionRepository: Repository<Option>,

    ) { }

    
    async findAll(): Promise<Quizz[]> {
        return await this.quizzRepository.find();
    }

    async findOneById(id: number): Promise<Quizz> {
        return await this.quizzRepository.findOneOrFail(id,
            {
                relations: [
                    "questions",
                    "questions.options"
                ]
            }
        );
    }

    async createQuizz(quizz: Quizz): Promise<Quizz> {

        let newQuizz = new Quizz();
        newQuizz.title = quizz.title;
        newQuizz.version = quizz.version;
        newQuizz.description = quizz.description;
        newQuizz.lastUpdate = quizz.lastUpdate;
        newQuizz.creationDate = quizz.creationDate;
        newQuizz.creatorIdUser = quizz.creatorIdUser;
        newQuizz.idCategory = quizz.idCategory;
        newQuizz.requirement = quizz.requirement;
        newQuizz.duration = quizz.duration;

        this.quizzRepository.save(newQuizz).then(createQuizz => {
            for (const question of quizz.questions) {

                const newQuestion = new Question();
                newQuestion.question = question.question;
                newQuestion.annex = question.annex;
                newQuestion.score = question.score;
                newQuestion.idCategory = question.idCategory;

                newQuestion.quizz = createQuizz;

                this.questionRepository.save(newQuestion).then(createQuestion => {

                    for (const option of question.options) {

                        const newOption = new Option();
                        newOption.titleOption = option.titleOption;
                        newOption.isCorrect = option.isCorrect;

                        newOption.question = createQuestion;

                        this.optionRepository.save(newOption)
                    }

                });
            }

        });

        return quizz;
    }

}
