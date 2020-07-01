import { Controller, Get, Param } from '@nestjs/common';
import { ProgramService } from './program.service';
import { Program } from './program.entity';

@Controller('program')
export class ProgramController {

    constructor(
        private programService: ProgramService,
    ) { }

    @Get(':id')
    async getProgramById(@Param('id') id: number): Promise<Program> {
        console.log("ProgramController => getProgramById()", id)
        return await this.programService.findOneById(id);
    }
}
