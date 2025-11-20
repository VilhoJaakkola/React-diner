import pool from "../db/db";
import { UserCreateRequest, User } from "../models/users.model";


async function createUser(user: UserCreateRequest): Promise<User> {
  try {

    const sql = 'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(sql, [user.id, user.name, user.email, user.password]);

    return rows[0];
  } catch (error) {
    console.log('Database query error: ', error);
    throw new Error('Database query failed');
  }
}

async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, password, created, updated FROM users WHERE email = $1', [email])

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.log('Database query error: ', error);
    throw new Error('Database query failed');    
  }
}

export {
  createUser,
  findUserByEmail
}