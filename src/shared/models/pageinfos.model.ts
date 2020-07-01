import { IPageInfos } from "src/models/quizz/interfaces/pageinfos.interface";


export class PageInfos implements IPageInfos {
    constructor(
        public totalCount: number,
        public hasNextPage: boolean,
        public hasPreviousPage: boolean,
        public startCursor: number,
        public endCursor: number,
        public reverse: boolean,
    ) {}
}
