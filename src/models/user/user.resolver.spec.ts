import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { repositoryUserMockFactory } from './user.service.spec';
import { UserResolver } from './user.resolver';

describe('User Resolver', () => {
    let resolver: UserResolver;
    let userTest: User[] = [
        {
            id: 1,
            firstName: "Test 1",
            lastName: "Test",
            password: "123456",
            mail: "test@mail.com",
            photoUrl: "photo-url.png",
            lastConnectionDate: Date.now(),
            creationDate: Date.now(),
            roleName: "Admin",
        },
        {
            id: 2,
            firstName: "Test 2",
            lastName: "Test",
            password: "123456",
            mail: "test@mail.com",
            photoUrl: "photo-url.png",
            lastConnectionDate: Date.now(),
            creationDate: Date.now(),
            roleName: "User",
        }
    ]

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                UserService,
                UserResolver,
                { provide: getRepositoryToken(User), useFactory: repositoryUserMockFactory }
            ],
        }).compile();
        await module.init();

        resolver = module.get<UserResolver>(UserResolver);
    });

    test.only('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('getAllUsers', async () => {
        expect(await resolver.getAllUsers()).toEqual(userTest);
    });

    it('getOneUser', async () => {
        expect(await resolver.getOneUser(1)).toEqual(userTest[0]);
    });

    it('createUser', async () => {
        const newUser = new User();
        newUser.firstName = "User from UT";
        newUser.lastName = "Test";
        newUser.mail = "test@mail.com";
        newUser.password = "123456";
        newUser.photoUrl = "photo-url.png";
        newUser.lastConnectionDate = Date.now();
        newUser.creationDate = Date.now();
        newUser.roleName = "Admin";

        const user = await resolver.createUser(newUser);
        expect(user.firstName).toEqual(newUser.firstName);
    });

})