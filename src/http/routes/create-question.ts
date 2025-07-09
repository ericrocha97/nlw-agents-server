import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { log } from '../../utils/index.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      log({
        type: 'info',
        message: 'Creating question for room',
      });
      try {
        const { roomId } = request.params;
        const { question } = request.body;

        const result = await db
          .insert(schema.questions)
          .values({ roomId, question })
          .returning();

        const insertedQuestion = result[0];

        if (!insertedQuestion) {
          throw new Error(`Failed to create new question for room: ${roomId}`);
        }

        return reply.status(201).send({ questionId: insertedQuestion.id });
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
