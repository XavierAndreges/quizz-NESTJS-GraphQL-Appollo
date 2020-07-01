
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Option {
    id: number;
    titleOption?: string;
}

export abstract class IQuery {
    abstract getQuizzById(id: number): Quizz | Promise<Quizz>;
}

export class Question {
    id: number;
    question?: string;
}

export class Quizz {
    id: number;
    title?: string;
}
