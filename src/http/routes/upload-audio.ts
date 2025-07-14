import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts';
import { log } from '../../utils/index.ts';
import { roomIdParamsSchema } from '../schemas/common-schemas.ts';

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: roomIdParamsSchema,
      },
    },
    async (request, reply) => {
      log({
        type: 'info',
        message: `Uploading audio for room: ${request.params.roomId}`,
      });
      const { roomId } = request.params;
      const audio = await request.file();

      if (!audio) {
        log({
          type: 'error',
          message: `No audio file provided for room: ${roomId}`,
        });
        return reply.status(400).send({ error: 'Audio file is required' });
      }

      const audioBuffer = await audio.toBuffer();
      const audioAsBase64 = audioBuffer.toString('base64');

      const transcription = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      );

      const embeddings = await generateEmbeddings(transcription);

      const result = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription,
          embeddings,
        })
        .returning();

      const chunk = result[0];

      if (!chunk) {
        throw new Error('Failed to save audio chunk');
      }

      return reply.status(201).send({ chunkId: chunk.id });
    }
  );
};
