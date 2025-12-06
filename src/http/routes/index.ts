import type { FastifyInstance } from 'fastify';
import { audioRoutes } from '../../modules/audio/audio.routes.ts';
import { questionRoutes } from '../../modules/questions/question.routes.ts';
import { roomRoutes } from '../../modules/rooms/room.routes.ts';
import { healthRoute } from './health.ts';

export async function appRoutes(app: FastifyInstance) {
  await app.register(healthRoute);
  await app.register(roomRoutes);
  await app.register(questionRoutes);
  await app.register(audioRoutes);
}
