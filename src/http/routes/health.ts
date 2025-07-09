import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
export const healthRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/health', (_request, reply) => {
    return reply.status(200).send({ status: 'ok' });
  });
};
