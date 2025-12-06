import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { container } from 'tsyringe';
import { AudioController } from './audio.controller.ts';
import { roomIdParamsSchema } from './audio.schemas.ts';

const audioController = container.resolve(AudioController);

export const audioRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: roomIdParamsSchema,
      },
    },
    audioController.uploadAudio.bind(audioController)
  );
};
