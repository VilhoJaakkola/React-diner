import { FastifyInstance } from 'fastify';
import { getFoods, getFoodById, createFood, updateFood, deleteFood } from '../controllers/foods.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

export default async function foodRoutes(app: FastifyInstance) {
  app.get('/', getFoods);
  app.get('/:id', getFoodById);
  app.post('/', { preHandler: verifyToken }, createFood);
  app.put('/:id', { preHandler: verifyToken }, updateFood);
  app.delete('/:id', { preHandler: verifyToken }, deleteFood);
}