import pool from "../db/db";
import type { Food, FoodCreateRequest } from "../models/foods.model";

// Get all food items
async function ctrlGetFoods() {
  try {
    const response = await pool.query("SELECT * FROM foods");
    return response.rows;
  } catch (error) {
    console.log('Database error: ', error);
    throw new Error('An error occurred while fetching foods');
  }
}

// Get a single food item by id
async function ctrlGetFoodById(id: number): Promise<Food | null> {
  try {
    const response = await pool.query("SELECT * FROM foods WHERE id = $1", [id]);
    if (response.rowCount === 0) {
      return null;
    }
    return response.rows[0];
  } catch (error) {
    console.log('Database error: ', error);
    throw new Error('An error occurred while fetching food by id');
  }
}

// The demanded properties are only ones used to create a new food item (name, price, description)
async function ctrlCreateFood(food: FoodCreateRequest): Promise<Food> {
  try {
    const { name, price, description, image = "" } = food;
    if (!name || !price || !description) {
      throw new Error('Missing a required value');
    }

    const sql = `
      INSERT INTO foods (name, price, description, image, created, updated)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    const response = await pool.query(sql, [name, price, description, image]);
    
    return response.rows[0];
  } catch (error) {
    console.log('Database error: ', error);
    throw new Error('An error occurred while creating food');
  }
}

// Update a food item by id
async function ctrlUpdateFood(id: number, food: Partial<Food>): Promise<Food | null> {
  try {
    const fields = Object.keys(food);
    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`);
    const values = Object.values(food);

    setClauses.push('updated = CURRENT_TIMESTAMP');

    const sql = `UPDATE foods SET ${setClauses.join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;

    const response = await pool.query(sql, [...values, id]);

    if (response.rowCount === 0) {
      return null;
    }
    return response.rows[0];
  } catch (error) {
    console.log('Database error: ', error);
    throw new Error('An error occurred while updating food');
  }
}

// Delete a food item by id
async function ctrlDeleteFood(id: number): Promise<Food | null> {
  try {
    const response = await pool.query("DELETE FROM foods WHERE id = $1 RETURNING *", [id]);
    if (response.rowCount === 0) {
      return null;
    }
    return response.rows[0];
  } catch (error) {
    console.log('Database error: ', error);
    throw new Error('An error occurred while deleting food');
  }
}

export {
  ctrlGetFoods,
  ctrlGetFoodById,
  ctrlCreateFood,
  ctrlUpdateFood,
  ctrlDeleteFood
};