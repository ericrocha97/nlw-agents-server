import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { healthRoute } from './http/routes/health.ts';
import { env, log } from './utils/index.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(healthRoute);

app.register(getRoomsRoute);

app.listen({ port: env.PORT }).then(() => {
  log({
    type: 'info',
    message: `Server is running on http://localhost:${process.env.PORT}`,
  });
});
