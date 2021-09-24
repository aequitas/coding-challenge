import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { KnexModule } from 'nest-knexjs';
import { ValidationPipe } from '@nestjs/common';

describe('Code challenge (e2e)', () => {
  let app: INestApplication;

  // setup application for testing
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRoot({
          config: {
            client: 'sqlite3',
            useNullAsDefault: true,
            connection: {
              filename: 'db.sqlite',
            },
          },
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create users', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'example',
        email: 'example@example.com',
        password: 'Welcome2021!',
      })
      .expect(201);
  });

  it('should change user email', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ email: 'example2@example.com' })
      .expect(200);
  });

  it('should refuse invalid password', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'example2',
        email: 'example@example.com',
        password: 'toshort',
      })
      .expect(400);
  });

  // it('should change user password', () => {
  //   return request(app.getHttpServer())
  //     .patch('/users/1')
  //     .send({password: 'Secure2021!'})
  //     .expect(200)
  // });

  it('should delete user', () => {
    // let userId = userService.create({name: 'example', email: 'example@example.com', password: "Welcome2021!"})
    // console.log(userId);
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  it('should add user hobbies', () => {
    return request(app.getHttpServer())
      .post('/hobbies')
      .send({ name: 'code challenges', description: 'example', userId: 1 })
      .expect(201);
  });

  it("should list user's hobbies", () => {
    return request(app.getHttpServer()).get('/hobbies').expect(200);
  });

  it('should change user hobbies', () => {
    return request(app.getHttpServer())
      .patch('/hobbies/1')
      .send({ name: 'snowboarding' })
      .expect(200);
  });

  it('should delete user hobbies', () => {
    return request(app.getHttpServer()).delete('/hobbies/1').expect(200);
  });
});
