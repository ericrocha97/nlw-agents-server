import { desc, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { log } from '../../utils/index.ts';
import { roomIdParamsSchema } from '../schemas/common-schemas.ts';

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: roomIdParamsSchema,
      },
    },
    async (request, reply) => {
      log({
        type: 'info',
        message: `Fetching questions for room: ${request.params.roomId}`,
      });
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
          message: `No questions found for room: ${roomId}`,
        });
        return reply.status(404).send({
          error: 'Not Found',
          message: 'No questions found for this room.',
        });
      }

      return reply.status(200).send(results);
    }
  );
};
