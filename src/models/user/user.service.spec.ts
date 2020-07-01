import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryUserMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => {
    return {
      id: 1,
      firstName: "Test 1",
      lastName: "Test",
      password: "123456",
      mail: "test@mail.com",
      photoUrl: "photo-url.png",
      lastConnectionDate: Date.now(),
      creationDate: Date.now(),
      roleName: "Admin",
    }
  }),
  find: jest.fn(entity => {
    return [
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
  }),
  findOneOrFail: jest.fn(entity => entity),
  save: jest.fn(entity => entity)
}));

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<User>>;
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
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          // useClass: User,
          useFactory: repositoryUserMockFactory
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllUsers', async () => {
    expect(await service.getAllUsers()).toEqual(userTest)
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

    const user = await service.createUser(newUser);

    expect(user.firstName).toEqual(newUser.firstName)
  });

  it('findUserById', async () => {
    const user = userTest[0];
    expect(await service.findUserById(1)).toEqual(user);
  });

});
