import type { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { RoomService } from './room.service.ts';
import { createRoomBodySchema } from './room.schemas.ts';
import { z } from 'zod';

@injectable()
export class RoomController {
  constructor(@inject('RoomService') private roomService: RoomService) {}

  async createRoom(
    request: FastifyRequest<{ Body: z.infer<typeof createRoomBodySchema> }>,
    reply: FastifyReply
  ) {
    const { name, description } = request.body;
    const room = await this.roomService.createRoom(name, description);
    return reply.status(201).send({ roomId: room.id });
  }

  async getRooms(_request: FastifyRequest, reply: FastifyReply) {
    const rooms = await this.roomService.getRooms();
    if (rooms.length === 0) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'No rooms found.',
      });
    }
    return reply.status(200).send(rooms);
  }
}
