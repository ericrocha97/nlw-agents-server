import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { container } from 'tsyringe';
import { QuestionController } from './question.controller.ts';
import { createQuestionBodySchema, roomIdParamsSchema } from './question.schemas.ts';

const questionController = container.resolve(QuestionController);

export const questionRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: roomIdParamsSchema,
        body: createQuestionBodySchema,
      },
    },
    questionController.createQuestion.bind(questionController)
  );

  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: roomIdParamsSchema,
      },
    },
    questionController.getRoomQuestions.bind(questionController)
  );
};
