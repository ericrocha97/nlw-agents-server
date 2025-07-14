import { z } from 'zod/v4';

export const createQuestionBodySchema = z.object({
  question: z.string().min(1),
});
