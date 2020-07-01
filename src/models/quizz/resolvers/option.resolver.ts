import {Args, Query, Resolver, ResolveProperty, Parent} from '@nestjs/graphql';
import { Option } from 'src/models/quizz/entities/option.entity';
import { ParseIntPipe } from '@nestjs/common';
import { OptionService } from 'src/models/quizz/services/option.service';

@Resolver('Option')

export class OptionResolver {

  constructor(
    private readonly optionService: OptionService
  ) {}

  @Query()
  async option(@Args('id', ParseIntPipe) id: number): Promise<Option> {
    return await this.optionService.findOneById(id);
  }
  
}