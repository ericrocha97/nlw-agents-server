import type { FastifyInstance } from 'fastify';
import { createQuestionRoute } from './create-question.ts';
import { createRoomRoute } from './create-room.ts';
import { getRoomQuestions } from './get-room-questions.ts';
import { getRoomsRoute } from './get-rooms.ts';
import { healthRoute } from './health.ts';
import { uploadAudioRoute } from './upload-audio.ts';

export async function appRoutes(app: FastifyInstance) {
  await app.register(healthRoute);
  await app.register(getRoomsRoute);
  await app.register(createRoomRoute);
  await app.register(getRoomQuestions);
  await app.register(createQuestionRoute);
  await app.register(uploadAudioRoute);
}
