import type { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { QuestionService } from './question.service.ts';
import { createQuestionBodySchema, roomIdParamsSchema } from './question.schemas.ts';
import { z } from 'zod';

@injectable()
export class QuestionController {
  constructor(
    @inject('QuestionService') private questionService: QuestionService
  ) {}

  async createQuestion(
    request: FastifyRequest<{
      Params: z.infer<typeof roomIdParamsSchema>;
      Body: z.infer<typeof createQuestionBodySchema>;
    }>,
    reply: FastifyReply
  ) {
    const { roomId } = request.params;
    const { question } = request.body;
    const result = await this.questionService.createQuestion(roomId, question);
    return reply.status(201).send(result);
  }

  async getRoomQuestions(
    request: FastifyRequest<{ Params: z.infer<typeof roomIdParamsSchema> }>,
    reply: FastifyReply
  ) {
    const { roomId } = request.params;
    const questions = await this.questionService.getRoomQuestions(roomId);
    if (questions.length === 0) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'No questions found for this room.',
      });
    }
    return reply.status(200).send(questions);
  }
}
