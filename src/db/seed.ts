import { reset, seed } from 'drizzle-seed';
import { log } from '../utils/index.ts';
import { db, sql } from './connection.ts';
import { questions } from './schema/questions.ts';
import { rooms } from './schema/rooms.ts';

const tablesToSeed = {
  rooms,
  questions,
};

log({
  type: 'info',
  message: 'Resetting database...',
});

await reset(db, tablesToSeed);

log({
  type: 'info',
  message: 'Seeding database...',
});

await seed(db, tablesToSeed).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
        createdAt: f.date({
          maxDate: new Date('2025-07-01'),
          minDate: new Date('2025-01-01'),
        }),
      },
    },
    questions: {
      count: 20,
      columns: {
        createdAt: f.date({
          maxDate: new Date('2025-07-01'),
          minDate: new Date('2025-01-01'),
        }),
      },
    },
  };
});

await sql.end();

log({
  type: 'info',
  message: 'Database seeded successfully!',
});
