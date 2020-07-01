import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { QuizzModule } from './models/quizz/modules/quizz.module';
import { QuestionModule } from './models/quizz/modules/question.module';
import { GraphQLModule } from '@nestjs/graphql';
import { DateScalar } from './shared/scalar/date.scalar';
import { ProgramModule } from './models/program/program.module';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'open_quizz',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.gql'],
      include: [
        UserModule, 
        QuizzModule,
        ProgramModule
      ],
      context: ({ req }) => ({ req }), 
    }),
    QuizzModule,
    UserModule,
    QuestionModule,
    ProgramModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DateScalar
  ],
})
export class AppModule { }