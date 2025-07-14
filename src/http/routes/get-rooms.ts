import { count, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { log } from '../../utils/index.ts';

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async (_request, reply) => {
    log({
      type: 'info',
      message: 'Fetching all rooms',
    });
    const results = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        createdAt: schema.rooms.createdAt,
        questionsCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id)
      .orderBy(schema.rooms.createdAt);

    if (results.length === 0) {
      log({
        type: 'warn',
        message: 'No rooms found.',
      });
      return reply.status(404).send({
        error: 'Not Found',
        message: 'No rooms found.',
      });
    }

    return reply.status(200).send(results);
  });
};
