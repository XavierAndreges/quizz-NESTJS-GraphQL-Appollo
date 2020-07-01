import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserInput } from './models/user-input';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getAllUsers() {
        return this.userRepository.find();
    }

    async createUser(user: UserInput) {

        const newUser = new User();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.mail = user.mail;
        newUser.password = user.password;
        newUser.photoUrl = user.photoUrl;
        newUser.lastConnectionDate = Date.now();
        newUser.creationDate = Date.now();
        newUser.roleName = user.roleName;

        return await this.userRepository.save(newUser)
    }

    // FIXME:
    // async updateUser(userId: number, user: User) {
    //     return await this.userRepository.update(userId, user);
    // }

    async findUserById(userId: number): Promise<User> {
        return await this.userRepository.findOne(userId);
    }

    async findUserByMail(mail: string): Promise<User> {
        return await this.userRepository.findOne({where : {"mail" : mail}});
    }
}