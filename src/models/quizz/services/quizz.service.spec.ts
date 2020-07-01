import { Test, TestingModule } from '@nestjs/testing';
import { QuizzService } from '../quizz.service';

import { InjectRepository } from '@nestjs/typeorm';

describe('QuizzService', () => {
  let service: QuizzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzService,
        { provide: QuizzService, useValue: {} }
      ],
    }).compile();

    service = module.get<QuizzService>(QuizzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
