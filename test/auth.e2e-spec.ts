import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { registerAndAuthUser } from './utils/auth-user';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/test (GET)', async () => {
    const { token } = await registerAndAuthUser();

    return request(app.getHttpServer())
      .get('/auth/test')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Success!');
  });
});
