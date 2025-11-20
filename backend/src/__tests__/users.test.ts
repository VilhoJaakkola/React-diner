import { describe, expect, test } from "@jest/globals";
import request from "supertest";

import app from "../app";
import { UserCreateRequest } from "../models/users.model";

import pool from "../db/db";

const testUser = {
  email: 'esa@test.com',
}

describe("POST signup endpoint", () => {

  test("returns 201 and valid JSON if created", async () => {
    const newUser: UserCreateRequest = {
      name: "esa",
      email: "esa@test.com",
      password: "esa12345",
      admin: true
    };

    const response = await request(app)
      .post("/api/users/signup")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(newUser)

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(expect.objectContaining({
      name: "esa",
      id: expect.any(String),
      token: expect.any(String)
    }));
  });

  test("returns 400 if trying to add user with existing email", async () => {
    const newUser: UserCreateRequest = {
      name: "esa",
      email: "esa@test.com",
      password: "esa12345",
      admin: true
    }
    
    const response = await request(app)
      .post("/api/users/signup")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(newUser)

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'User already exists' });
  });

  test("returns 400 if trying to add user with missing name", async () => {
    const newUser: UserCreateRequest = {
      name: "",
      email: "email@test.com",
      password: "password",
      admin: true
    }

    const response = await request(app)
      .post("/api/users/signup")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(newUser)

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid input' });
  });
});

describe("POST login endpoint", () => {

  test("returns 200 and valid JSON if login successful", async () => {
    const user = {
      name: "esa",
      email: "esa@test.com",
      password: "esa12345"
    };

    const response = await request(app)
      .post("/api/users/login")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(user)

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(expect.objectContaining({
      name: "esa",
      id: expect.any(String),
      token: expect.any(String)
    }));
  });

  test("returns 400 if trying to login with invalid email", async () => {
    const user = {
      name: "esa",
      email: "invalidemail",
      password: "esa12345"
    };

    const response = await request(app)
      .post("/api/users/login")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(user)

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid input, zod error' });
  });
});



afterAll(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', [testUser.email])
});