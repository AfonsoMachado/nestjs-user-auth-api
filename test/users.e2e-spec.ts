import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { generateUser } from './utils/faker-data';
import { UsersService } from '../src/users/services/users.service';
import { mockService } from './utils/mock-service';
import { registerAndAuthUser } from './utils/auth-user';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  process.env.NODE_ENV = 'test';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = await mockService(UsersService, moduleFixture);
    usersService.removeAll();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    process.env.NODE_ENV = '';
  });

  it('/users (POST)', async () => {
    const user = generateUser();

    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)
      .then((response) => {
        delete user.password;
        expect(response.body).toMatchObject(user);
      });
  });

  it('/users (GET)', async () => {
    const { user, token } = await registerAndAuthUser();

    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toContainEqual(user);
      });
  });

  it('/users/:id (GET)', async () => {
    const { user, token } = await registerAndAuthUser();

    await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject(user);
      });
  });

  it('/users/:id (DELETE)', async () => {
    const { user, token } = await registerAndAuthUser();

    await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual(
          `Usuário de id #${user.id} removido com sucesso.`,
        );
      });
  });

  it('/users/:id (PATCH)', async () => {
    const { user, token } = await registerAndAuthUser();

    const userUpdated = generateUser();

    await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdated)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual(
          `Usuário de id #${user.id} alterado com sucesso.`,
        );
      });
  });

  it('/users/:id (GET) - Errors (404/401)', async () => {
    const { user, token } = await registerAndAuthUser();

    await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(401)
      .then((response) =>
        expect(response.body.message).toEqual('Unauthorized'),
      );

    const invalidId = Math.random();

    await request(app.getHttpServer())
      .get(`/users/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(
          `Usuário de id #${invalidId} não encontrado na base de dados.`,
        );
      });
  });

  it('/users/:id (DELETE) - Errors (404/401)', async () => {
    const { user, token } = await registerAndAuthUser();

    await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(401)
      .then((response) =>
        expect(response.body.message).toEqual('Unauthorized'),
      );

    const invalidId = Math.random();

    await request(app.getHttpServer())
      .delete(`/users/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(
          `Usuário de id #${invalidId} não encontrado na base de dados.`,
        );
      });
  });

  it('/users/:id (PATCH) - Errors (404/401)', async () => {
    const { user, token } = await registerAndAuthUser();

    const userUpdated = generateUser();

    await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send(userUpdated)
      .expect(401)
      .then((response) =>
        expect(response.body.message).toEqual('Unauthorized'),
      );

    const invalidId = Math.random();

    await request(app.getHttpServer())
      .patch(`/users/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdated)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(
          `Usuário de id #${invalidId} não encontrado na base de dados.`,
        );
      });
  });
});
