import { and, desc, eq, sql } from 'drizzle-orm';
import { injectable } from 'tsyringe';
import { db } from '../../core/db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateAnswer, generateEmbeddings } from '../../services/gemini.ts';
import { injectable } from 'tsyringe';

@injectable()
export class QuestionService {
  async createQuestion(roomId: string, question: string) {
    const embeddings = await generateEmbeddings(question);
    const embeddingsAsString = `[${embeddings.join(',')}]`;

    const chunks = await db
      .select({
        id: schema.audioChunks.id,
        transcription: schema.audioChunks.transcription,
        similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
      })
      .from(schema.audioChunks)
      .where(
        and(
          eq(schema.audioChunks.roomId, roomId),
          sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`
        )
      )
      .orderBy(
        sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`
      )
      .limit(3);

    let answer: string | null = null;

    if (chunks.length > 0) {
      const transcriptions = chunks.map((chunk) => chunk.transcription);
      answer = await generateAnswer(question, transcriptions);
    }

    const result = await db
      .insert(schema.questions)
      .values({ roomId, question, answer })
      .returning();

    const insertedQuestion = result[0];

    if (!insertedQuestion) {
      throw new Error(`Failed to create new question for room: ${roomId}`);
    }

    return { questionId: insertedQuestion.id, answer };
  }

  async getRoomQuestions(roomId: string) {
    const results = await db
      .select({
        id: schema.questions.id,
        question: schema.questions.question,
        answer: schema.questions.answer,
        createdAt: schema.questions.createdAt,
      })
      .from(schema.questions)
      .where(eq(schema.questions.roomId, roomId))
      .orderBy(desc(schema.questions.createdAt));

    if (results.length === 0) {
      return [];
    }

    return results;
  }
}
