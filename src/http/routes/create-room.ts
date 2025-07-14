import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { log } from '../../utils/index.ts';
import { createRoomBodySchema } from '../schemas/room-schemas.ts';

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: createRoomBodySchema,
      },
    },
    async (request, reply) => {
      log({
        type: 'info',
        message: `Creating new room: ${request.body.name}`,
      });
      const { name, description } = request.body;

      const result = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning();

      const insertedRoom = result[0];

      if (!insertedRoom) {
        throw new Error('Failed to create new room.');
      }

      return reply.status(201).send({ roomId: insertedRoom.id });
    }
  );
};
