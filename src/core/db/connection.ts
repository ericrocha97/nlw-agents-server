import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../utils/index.ts';
import { schema } from '../../db/schema/index.ts';

export const sql = postgres(env.DATABASE_URL);
export const db = drizzle(sql, {
  schema,
  casing: 'snake_case',
});
