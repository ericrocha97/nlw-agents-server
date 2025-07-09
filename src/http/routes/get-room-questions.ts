import { desc, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { log } from '../../utils/index.ts';

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      log({
        type: 'info',
        message: 'Fetching all questions for rooms',
      });
      try {
        const { roomId } = request.params;

        const results = await db
          .select({
            id: schema.questions.id,
            question: schema.questions.question,
            answer: schema.questions.answer,
            createdAt: schema.questions.createdAt,
          })
          .from(schema.questions)
          .where(eq(schema.questions.roomId, roomId))
          .orderBy(desc(schema.questions.createdAt));

        if (results.length === 0) {
          log({
            type: 'warn',
            message: 'No questions for this rooms found.',
          });
          return reply.status(404).send({
            error: 'Not Found',
            message: 'No questions for this rooms found.',
          });
        }

        return reply.status(200).send(results);
      } catch (error) {
        log({
          type: 'error',
          message: `Error fetching questions for rooms: ${error}`,
        });
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'An error occurred while fetching questions for rooms.',
        });
      }
    }
  );
};
