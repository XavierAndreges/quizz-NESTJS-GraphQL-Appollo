import { UserInput } from './models/user-input';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';


@Resolver('User')
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ) { }

    @Query()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @Query()
    async getOneUser(@Args('id', ParseIntPipe) id: number, ): Promise<User> {
        return await this.userService.findUserById(id);
    }

    @Mutation()
    async createUser(@Args('user') user: UserInput) {
        return await this.userService.createUser(user);
    }

    @Mutation()
    async updateUser(@Args('userId') userId: number, @Args('input') user: User) {
        // return await this.userService.updateUser(userId, user);
    }

}