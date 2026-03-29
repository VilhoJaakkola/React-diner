import { FastifyInstance } from 'fastify';
import { signUpUser, loginUser } from '../controllers/users.controller.js';

export default async function userRoutes(app: FastifyInstance) {
  app.post('/signup', signUpUser);
  app.post('/login', loginUser);
}