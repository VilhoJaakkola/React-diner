import Fastify from 'fastify';
import cors from '@fastify/cors';
import staticFiles from '@fastify/static';
import path from 'path';

import foodRoutes from './routes/foods.route.js';
import userRoutes from './routes/users.route.js';

const app = Fastify({logger: true});

await app.register(cors, {
  origin: ['http://localhost:5173', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

await app.register(staticFiles, {
  root: path.join(import.meta.dirname, '..', 'public'),
  prefix: '/',
});

await app.register(foodRoutes, {prefix: '/api/foods'});
await app.register(userRoutes, {prefix: '/api/users'});

export default app;