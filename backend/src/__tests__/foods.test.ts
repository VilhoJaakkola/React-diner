import { describe, expect, test } from "@jest/globals";
import request from "supertest";

import app from "../app";
import { FoodCreateRequest } from "../models/foods.model";

import pool from "../db/db";

const loggedInUser = {
  id: '',
  email: '',
  token: ''
}

let testItemId: number;

beforeAll(async () => {
  const data = {
    name: 'John Wayne',
    email: 'john.wayne@domain.com',
    password: 'password123'
  }


  const response = await request(app)
    .post('/api/users/signup')
    .set('Accept', 'application/json')
    .send(data)
  loggedInUser.id = response.body.id
  loggedInUser.email = response.body.email
  loggedInUser.token = response.body.token
});

describe("GET foods endpoint", () => {

  test("returns 200", (done) => {
    request(app)
      .get("/api/foods")
      .expect(200)
      .end(done);
  });

  test("returns valid JSON", async () => {
    const response = await request(app)
      .get("/api/foods")
      .set('Accept', 'application/json')

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe("GET food by id endpoint", () => {

  test("returns 200 and valid JSON if found", async () => {
    const response = await request(app)
      .get("/api/foods/1")
      .set('Accept', 'application/json')

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(expect.objectContaining({
      id: 1,
      name: "Mac & Cheese",
      price: "8.99",
      description: "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
      image: "mac-and-cheese.jpg",
      created: expect.any(String),
      updated: expect.any(String)
    }));
  });

  test("returns 404 and Not Found", async () => {
    const response = await request(app)
      .get("/api/foods/0")
      .set('Accept', 'application/json')

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Food not found' });
  });
});

describe("POST food endpoint", () => {

  test("returns 201 and valid JSON if created", async () => {
    const newFood: FoodCreateRequest = {
      name: "Testi",
      price: 5.00,
      description: "Testi",
      image: "https://example.com/image.jpg"
    };

    const response = await request(app)
      .post("/api/foods")
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(newFood)

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Testi');
    expect(response.body.price).toEqual('5.00');
    expect(response.body.description).toEqual('Testi');
    expect(response.body.image).toBeTruthy();
    expect(response.body.created).toBeTruthy();
    expect(response.body.updated).toBeTruthy();

    testItemId = response.body.id;
  });

  test('should not allow creating a food without a name', async () => {
    const newFood: FoodCreateRequest = {
      name: '',
      price: 5.00,
      description: 'Testi',
      image: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .post('/api/foods')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(newFood);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Missing a required value', error: [{ message: 'Name must be at least 1 character long', minimum: 2, code: "too_small", exact: false, inclusive: true, path: ['name'], type: 'string' }] });
  });

  test('should not allow creating a food without a price', async () => {
    const newFood: FoodCreateRequest = {
      name: 'Testi',
      price: 0,
      description: 'Testi',
      image: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .post('/api/foods')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(newFood);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Missing a required value', error: [{ message: 'Price must be a positive number', code: "too_small", exact: false, inclusive: false, minimum: 0, type: 'number', path: ['price'] }] });
  });

  test('should not allow creating a food without a description', async () => {
    const newFood: FoodCreateRequest = {
      name: 'Testi',
      price: 5.00,
      description: '',
      image: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .post('/api/foods')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(newFood);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Missing a required value', error: [{ message: 'Description must be at least 1 character long', minimum: 2, code: "too_small", exact: false, inclusive: true, path: ['description'], type: 'string' }] });
  });

  test('should not allow too short name', async () => {
    const newFood: FoodCreateRequest = {
      name: 'T',
      price: 5.00,
      description: 'Testi',
      image: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .post('/api/foods')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(newFood);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Missing a required value', error: [{ message: 'Name must be at least 1 character long', minimum: 2, code: "too_small", exact: false, inclusive: true, path: ['name'], type: 'string' }] });
  });

  test('should not allow too short description', async () => {
    const newFood: FoodCreateRequest = {
      name: 'Testi',
      price: 5.00,
      description: 'T',
      image: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .post('/api/foods')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(newFood);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Missing a required value', error: [{ message: 'Description must be at least 1 character long', minimum: 2, code: "too_small", exact: false, inclusive: true, path: ['description'], type: 'string' }] });
  });
});

describe("PUT food endpoint", () => {

  test("returns 200 and valid JSON if updated", async () => {
    const updatedFood: FoodCreateRequest = {
      name: "Testi",
      price: 5.00,
      description: "Testi",
      image: "https://example.com/image.jpg"
    };

    const response = await request(app)
      .put(`/api/foods/${testItemId}`)
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(updatedFood)

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Testi');
    expect(response.body.price).toEqual('5.00');
    expect(response.body.description).toEqual('Testi');
    expect(response.body.image).toBeTruthy();
    expect(response.body.created).toBeTruthy();
    expect(response.body.updated).toBeTruthy();
  });

  test('should return 404 if food not found', async () => {
    const updatedFood: FoodCreateRequest = {
      name: 'Testi',
      price: 5.00,
      description: 'Testi',
      image: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .put('/api/foods/0')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(updatedFood);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({ message: 'Food not found' });
  });

});

describe("DELETE food endpoint", () => {

  test("returns 200 and valid JSON if deleted", async () => {
    const response = await request(app)
      .delete(`/api/foods/${testItemId}`)
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')
      

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test("returns 404 and Not Found if not found", async () => {
    const response = await request(app)
      .delete("/api/foods/0")
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json')

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Food not found' });
  });
});


afterAll(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', [loggedInUser.email]);
  await pool.end();
});