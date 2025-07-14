import { z } from 'zod/v4';

export const roomIdParamsSchema = z.object({
  roomId: z.string(),
});
