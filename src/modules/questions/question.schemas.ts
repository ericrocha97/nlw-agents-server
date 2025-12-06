import { z } from 'zod';

export const createQuestionBodySchema = z.object({
  question: z.string().min(1),
});

export const roomIdParamsSchema = z.object({
  roomId: z.string(),
});
