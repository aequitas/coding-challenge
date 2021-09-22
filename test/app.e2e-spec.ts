import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Code challenge (e2e)', () => {
  let app: INestApplication;

  // setup application for testing
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({name: 'example', email: 'example@example.com', password: "Welcome2021!"})
      .expect(201)
  });

  it('user should be added', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({0:{name: "example"}});
  });

  it('should change user email', () => {
    return request(app.getHttpServer())
      .patch('/users/example')
      .send({email: 'example2@example.com'})
      .expect(200)
  });

  it('should change user password', () => {
    return request(app.getHttpServer())
      .patch('/users/example')
      .send({password: 'Secure2021!'})
      .expect(200)
  });

  it('should add user hobbies', () => {
    return request(app.getHttpServer())
      .post('/users/example/hobbies')
      .send({name: "code challenges"})
      .expect(201)
  });

  it('should list user\'s hobbies', () => {
    return request(app.getHttpServer())
      .get('/users/example/hobbies')
      .expect(200)
      .expect({
        data: [
        "code challenges",
        ]
      });
  });

  it('should change user hobbies', () => {
    return request(app.getHttpServer())
      .patch('/users/example/hobbies/code challenges')
      .send({name: "snowboarding"})
      .expect(200)
  });

  it('should remove user', () => {
    return request(app.getHttpServer())
      .delete('/users/example')
      .expect(200)
  });

  it('user removed', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({});
  });
});
