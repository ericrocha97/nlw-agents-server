import 'reflect-metadata';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { appRoutes } from './http/routes/index.ts';
import { env, log } from './utils/index.ts';
import './tsyringe.config.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

export { app };

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof Error) {
    log({
      type: 'error',
      message: `Error: ${error.message}`,
      details: error.stack,
    });
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: error.message,
    });
  }

  log({
    type: 'error',
    message: `Unknown error: ${error}`,
  });
  return reply.status(500).send({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred.',
  });
});

app.listen({ port: env.PORT }).then(() => {
  log({
    type: 'info',
    message: `Server is running on http://localhost:${process.env.PORT}`,
  });
});
