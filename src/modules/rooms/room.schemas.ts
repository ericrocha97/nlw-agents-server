import { z } from 'zod';

export const createRoomBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});
