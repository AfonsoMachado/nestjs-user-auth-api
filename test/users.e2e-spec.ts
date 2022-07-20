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
});
