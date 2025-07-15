import { test, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../src/server';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test('should be able to create a new room', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/rooms',
    payload: {
      name: 'Test Room',
      description: 'This is a test room',
    },
  });

  expect(response.statusCode).toBe(201);
  expect(JSON.parse(response.payload)).toEqual({
    roomId: expect.any(String),
  });
});

test('should be able to get all rooms', async () => {
  await app.inject({
    method: 'POST',
    url: '/rooms',
    payload: {
      name: 'Test Room 2',
      description: 'This is another test room',
    },
  });

  const response = await app.inject({
    method: 'GET',
    url: '/rooms',
  });

  expect(response.statusCode).toBe(200);
  const payload = JSON.parse(response.payload);
  expect(payload.length).toBeGreaterThan(0);
  expect(payload[0]).toHaveProperty('id');
  expect(payload[0]).toHaveProperty('name');
});
