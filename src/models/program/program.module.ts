import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './program.entity';
import { ProgramController } from './program.controller';
import { ProgramResolver } from './program.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  providers: [ProgramService, ProgramResolver],
  controllers: [ProgramController]
})
export class ProgramModule { }
