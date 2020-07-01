import { Resolver, Args, Query } from "@nestjs/graphql";
import { ParseIntPipe } from "@nestjs/common";
import { Program } from "./program.entity";
import { ProgramService } from "./program.service";


@Resolver('Program')

export class ProgramResolver {

    constructor(
        private readonly programService: ProgramService
    ) { }

    @Query()
    async getProgramById(@Args('id', ParseIntPipe) id: number): Promise<Program> {
        return await this.programService.findOneById(id);
    }

}