import type { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { AudioService } from './audio.service.ts';
import { roomIdParamsSchema } from './audio.schemas.ts';
import { z } from 'zod';

@injectable()
export class AudioController {
  constructor(@inject('AudioService') private audioService: AudioService) {}

  async uploadAudio(
    request: FastifyRequest<{ Params: z.infer<typeof roomIdParamsSchema> }>,
    reply: FastifyReply
  ) {
    const { roomId } = request.params;
    const audio = await request.file();

    if (!audio) {
      return reply.status(400).send({ error: 'Audio file is required' });
    }

    const audioBuffer = await audio.toBuffer();
    const chunk = await this.audioService.uploadAudio(
      roomId,
      audioBuffer,
      audio.mimetype
    );

    return reply.status(201).send({ chunkId: chunk.id });
  }
}
