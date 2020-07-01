import { Question } from 'src/models/quizz/entities/question.entity';
import { IGraphQLList } from '../interfaces/graphqllist.interface';
import { IPageInfos } from '../interfaces/pageinfos.interface';

export class QuestionList implements IGraphQLList {
    constructor(public infos: IPageInfos, public list: Question[]) {}
}
