import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { KnexModule } from 'nest-knexjs';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from '../src/users/users.service';
import { HobbiesService } from '../src/hobbies/hobbies.service';

const loggedInUserId = 1;

describe('Code challenge (e2e)', () => {
  let app: INestApplication;

  let usersService: UsersService;
  let hobbiesService: HobbiesService;

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
      providers: [UsersService, HobbiesService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    usersService = moduleFixture.get<UsersService>(UsersService);
    hobbiesService = moduleFixture.get<HobbiesService>(HobbiesService);

    // TODO: test assume a clean database, cleaning and migrations is currently
    // handled in Makefile, should be moved here.

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create users', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'example',
        email: 'example@example.com',
        password: 'Welcome2021!',
      })
      .expect(201);

    const users = await usersService.findAll();

    expect(users.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'example',
          email: 'example@example.com',
        }),
      ]),
    );
  });

  it('should change user email', async () => {
    await request(app.getHttpServer())
      .patch('/users/1')
      .send({ email: 'example2@example.com' })
      .expect(200);

    const { users } = await usersService.findOne(1, loggedInUserId);
    expect(users[0].email).toEqual('example2@example.com');
  });

  it('should refuse invalid password', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'example2',
        email: 'example@example.com',
        password: 'toshort',
      })
      .expect(400);

    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ password: 'toshort' })
      .expect(400);
  });

  it('should change user password', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ password: 'Secure2021!' })
      .expect(200);
  });

  it('should delete user', async () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);

    const { users } = await usersService.findAll();
    return expect(users).toHaveLength(0);
  });

  it('should not delete other user', () => {
    return request(app.getHttpServer()).delete('/users/2').expect(403);
  });

  it('should add user hobbies', async () => {
    await request(app.getHttpServer())
      .post('/hobbies')
      .send({
        name: 'code challenges',
        description: 'example',
        userId: loggedInUserId,
      })
      .expect(201);

    const { hobbies } = await hobbiesService.findAll(loggedInUserId);
    return expect(hobbies).toHaveLength(1);
  });

  it("should list user's hobbies", async () => {
    await request(app.getHttpServer()).get('/hobbies').expect(200);
  });

  it('should change user hobbies', async () => {
    await request(app.getHttpServer())
      .patch('/hobbies/1')
      .send({ name: 'snowboarding' })
      .expect(200);

    const { hobbies } = await hobbiesService.findOne(1, loggedInUserId);
    expect(hobbies[0].name).toEqual('snowboarding');
  });

  it('should delete user hobbies', async () => {
    await request(app.getHttpServer()).delete('/hobbies/1').expect(200);
    const { hobbies } = await hobbiesService.findAll(loggedInUserId);
    return expect(hobbies).toHaveLength(0);
  });

  it('should not delete other user hobbies', async () => {
    const otherUserId = 2;
    await hobbiesService.create(
      { name: 'test', description: 'test' },
      otherUserId,
    );

    return (
      request(app.getHttpServer())
        .delete('/hobbies/2')
        // users cannot see other users hobbies, so returning 404 instead of 403
        .expect(404)
    );
  });
});
