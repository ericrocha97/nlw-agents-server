import { count, eq } from 'drizzle-orm';
import { injectable } from 'tsyringe';
import { db } from '../../core/db/connection.ts';
import { schema } from '../../db/schema/index.ts';

@injectable()
export class RoomService {
  async createRoom(name: string, description?: string) {
    const result = await db
      .insert(schema.rooms)
      .values({
        name,
        description,
      })
      .returning();

    const insertedRoom = result[0];

    if (!insertedRoom) {
      throw new Error('Failed to create new room.');
    }

    return insertedRoom;
  }

  async getRooms() {
    const results = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        createdAt: schema.rooms.createdAt,
        questionsCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id)
      .orderBy(schema.rooms.createdAt);

    if (results.length === 0) {
      return [];
    }

    return results;
  }
}
