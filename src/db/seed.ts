import { reset, seed } from 'drizzle-seed';
import { log } from '../utils/index.ts';
import { db, sql } from './connection.ts';
import { schema } from './schema/index.ts';

await reset(db, schema);

await seed(db, schema).refine((f) => {
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
