import { FastifyRequest, FastifyReply } from 'fastify';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { ZodError } from 'zod';

import { UserCreateRequest, userLoginSchema, userSignupSchema } from '../models/users.model.js';
import { createUser, findUserByEmail } from '../services/users.service.js';
import { config } from '../config/config.js';

export const signUpUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  let validateUserData;

  try {
    validateUserData = userSignupSchema.parse(request.body);
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: 'Invalid input' });
      return;
    }
    reply.status(500).send({ error: 'Could not create user, try again' });
    return;
  }

  try {
    const existingUser = await findUserByEmail(validateUserData.email);
    if (existingUser) {
      reply.status(400).send({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(validateUserData.password, 12);

    const newUser: UserCreateRequest = {
      id: v4(),
      name: validateUserData.name,
      email: validateUserData.email,
      password: hashedPassword,
      admin: validateUserData.admin,
    };

    const userData = await createUser(newUser);
    if (!userData) {
      reply.status(500).send({ error: 'Could not create user, try again' });
      return;
    }

    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      config.JWT_KEY,
      { expiresIn: '1h' },
    );

    reply.status(201).send({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      admin: userData.admin,
      token,
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: 'Could not create user, try again' });
  }
};

export const loginUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  let validatedUserData;

  try {
    validatedUserData = userLoginSchema.parse(request.body);
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: 'Invalid input, zod error' });
      return;
    }
    reply.status(500).send({ error: 'Could not log in, try again' });
    return;
  }

  try {
    const user = await findUserByEmail(validatedUserData.email);
    if (!user) {
      reply.status(400).send({ message: 'Invalid credentials' });
      return;
    }

    const validPassword = await bcrypt.compare(validatedUserData.password, user.password);
    if (!validPassword) {
      reply.status(400).send({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_KEY,
      { expiresIn: '1h' },
    );

    reply.status(200).send({ id: user.id, name: user.name, token });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: 'Could not log in, try again' });
  }
};
