import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { IPagination } from 'src/models/quizz/interfaces/pagination.interface';
import { PageInfos } from '../models/pageinfos.model';

@Injectable()
export class BddService {

  public applyPagination(findOptions: FindManyOptions, pagination: IPagination): void {
    if (pagination) {
      findOptions.take = pagination.count;
      findOptions.skip = pagination.cursor;
      findOptions.order = {
        id: pagination.reverse ? 'DESC' : 'ASC',
      };
    }
  }

  public buildPageInfos(total: number, pagination: IPagination): PageInfos {
    const endCursor = pagination.reverse ? (pagination.cursor - pagination.count) : (pagination.cursor + pagination.count);
    const hasNext = pagination.reverse ? endCursor > 0 : total > endCursor;
    const hasPrevious = pagination.reverse ? pagination.cursor < total : pagination.cursor > 0;
    return new PageInfos(
      total,
      hasNext,
      hasPrevious,
      pagination.cursor,
      endCursor,
      pagination.reverse);
  }
}
