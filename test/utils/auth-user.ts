import { generateUser } from './faker-data';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';

export async function registerAndAuthUser() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();

  const userToRegister = generateUser();
  const user = await request(app.getHttpServer())
    .post('/users')
    .send(userToRegister)
    .then((response) => response.body);
  const token = await request(app.getHttpServer())
    .post('/auth')
    .send(userToRegister)
    .then((response) => response.body.access_token);

  return { user, token };
}
