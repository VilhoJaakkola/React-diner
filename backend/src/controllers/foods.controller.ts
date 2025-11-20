import { Request, Response, NextFunction } from 'express';
import { ctrlGetFoods, ctrlGetFoodById, ctrlCreateFood, ctrlUpdateFood, ctrlDeleteFood } from '../services/foods.service';
import { foodCreateRequestSchema } from '../models/foods.model';
import { verifyToken } from '../middleware/verifyToken';

const getFoods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const foods = await ctrlGetFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching foods' });
  }
};

const getFoodById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const food = await ctrlGetFoodById(id);
    if (!food) {
      res.status(404).json({ message: 'Food not found' }); // when hungry and haven't gone grocery shopping
      return;
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching food' });
  }
}

const createFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => { // If it were so easy...
  try {
    const validatedFood = foodCreateRequestSchema.parse(req.body);
    const data = await ctrlCreateFood(validatedFood);
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      res.status(400).json({ message: 'Missing a required value', error: error.errors});
      return;
    }
    res.status(500).json({ message: 'An error occurred while creating food' });
  }
}

const updateFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const food = req.body;
    const updatedFood = await ctrlUpdateFood(id, food);
    if (!updatedFood) {
      res.status(404).json({ message: 'Food not found' });
      return;
    }
    res.status(200).json(updatedFood);
  } catch (error) {
    if(error instanceof Error && 'errors' in error) {
      res.status(400).json({ message: 'Missing a required value' });
      return;
    }
    res.status(500).json({ message: 'An error occurred while updating food' });
  }
}

const deleteFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deletedFood = await ctrlDeleteFood(id);
    if (!deletedFood) {
      res.status(404).json({ message: 'Food not found' });
      return;
    }
    res.status(200).json(deletedFood);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting food' });
  }
}

export {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};