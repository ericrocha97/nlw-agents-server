import { db } from '../../core/db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts';
import { injectable } from 'tsyringe';

@injectable()
export class AudioService {
  async uploadAudio(
    roomId: string,
    audioBuffer: Buffer,
    mimetype: string
  ) {
    const audioAsBase64 = audioBuffer.toString('base64');

    const transcription = await transcribeAudio(audioAsBase64, mimetype);

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

    return chunk;
  }
}
