import { ContextIdFactory } from '@nestjs/core';
import { TestingModule } from '@nestjs/testing';

export async function mockService(
  serviceClass: any,
  moduleFixture: TestingModule,
) {
  const contextId = ContextIdFactory.create();

  jest
    .spyOn(ContextIdFactory, 'getByRequest')
    .mockImplementation(() => contextId);

  return await moduleFixture.resolve(serviceClass, contextId);
}
