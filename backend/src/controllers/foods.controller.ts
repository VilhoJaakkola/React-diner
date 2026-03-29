import { FastifyRequest, FastifyReply } from 'fastify';
import {
  ctrlGetFoods,
  ctrlGetFoodById,
  ctrlCreateFood,
  ctrlUpdateFood,
  ctrlDeleteFood,
} from '../services/foods.service.js';
import { foodCreateRequestSchema } from '../models/foods.model.js';

const getFoods = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const foods = await ctrlGetFoods();
    reply.status(200).send(foods);
  } catch (error) {
    reply.status(500).send({ message: 'An error occurred while fetching foods' });
  }
};

const getFoodById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const food = await ctrlGetFoodById(id);
    if (!food) {
      reply.status(404).send({ message: 'Food not found' }); // when hungry and haven't gone grocery shopping
      return;
    }
    reply.send(food);
  } catch (error) {
    reply.status(500).send({ message: 'An error occurred while fetching food' });
  }
};

const createFood = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => { // If it were so easy...
  try {
    const validatedFood = foodCreateRequestSchema.parse(request.body);
    const data = await ctrlCreateFood(validatedFood);
    reply.status(201).send(data);
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      reply.status(400).send({ message: 'Missing a required value', error: (error as any).errors });
      return;
    }
    reply.status(500).send({ message: 'An error occurred while creating food' });
  }
};

const updateFood = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const food = request.body;
    const updatedFood = await ctrlUpdateFood(id, food);
    if (!updatedFood) {
      reply.status(404).send({ message: 'Food not found' });
      return;
    }
    reply.status(200).send(updatedFood);
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      reply.status(400).send({ message: 'Missing a required value' });
      return;
    }
    reply.status(500).send({ message: 'An error occurred while updating food' });
  }
};

const deleteFood = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const deletedFood = await ctrlDeleteFood(id);
    if (!deletedFood) {
      reply.status(404).send({ message: 'Food not found' });
      return;
    }
    reply.status(200).send(deletedFood);
  } catch (error) {
    reply.status(500).send({ message: 'An error occurred while deleting food' });
  }
};

export { getFoods, getFoodById, createFood, updateFood, deleteFood };
