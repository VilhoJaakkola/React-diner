import express, { Request, Response} from 'express';
import { getFoods, getFoodById, createFood, updateFood, deleteFood } from '../controllers/foods.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/', verifyToken, createFood);
router.put('/:id', verifyToken, updateFood);
router.delete('/:id', verifyToken, deleteFood);

export default router;