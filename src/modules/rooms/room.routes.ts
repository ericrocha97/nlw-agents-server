import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { container } from 'tsyringe';
import { RoomController } from './room.controller.ts';
import { createRoomBodySchema } from './room.schemas.ts';

const roomController = container.resolve(RoomController);

export const roomRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: createRoomBodySchema,
      },
    },
    roomController.createRoom.bind(roomController)
  );

  app.get('/rooms', roomController.getRooms.bind(roomController));
};
