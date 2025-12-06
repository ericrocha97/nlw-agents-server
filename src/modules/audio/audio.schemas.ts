import { z } from 'zod';

export const roomIdParamsSchema = z.object({
  roomId: z.string(),
});
