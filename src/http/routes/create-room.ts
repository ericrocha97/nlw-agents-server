import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { log } from '../../utils/index.ts';

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      log({
        type: 'info',
        message: 'Creating new room',
      });
      try {
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
      } catch (error) {
        log({
          type: 'error',
          message: `Error in creating room: ${error}`,
        });
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'An error occurred while trying to create a new room.',
        });
      }
    }
  );
};
