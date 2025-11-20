import { Request, Response, NextFunction, RequestHandler } from "express"
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { ZodError } from "zod";

import { UserCreateRequest, userLoginSchema, userSignupSchema } from "../models/users.model";
import { createUser, findUserByEmail } from "../services/users.service";
import { config } from '../config/config';


export const signUpUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let validateUserData

  try {
    // Yritetään validoida syöte Zod-skeemalla
    validateUserData = userSignupSchema.parse(req.body);
  } catch (error) {
    // Jos validointi epäonnistuu, palautetaan 400
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Invalid input' });
      return;
    }
    // Tai jokin muu virhe, palautetaan 500
    res.status(500).json({ error: "Could not create user, try again" });
    return;
  }

  try {
    // Tarkistetaan onko käyttäjä jo olemassa
    const existingUser = await findUserByEmail(validateUserData.email);
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hashataan salasana
    const hashedPassword = await bcrypt.hash(validateUserData.password, 12);

    // Luodaan uusi käyttäjä
    const newUser: UserCreateRequest = {
      id: v4(),
      name: validateUserData.name,
      email: validateUserData.email,
      password: hashedPassword,
      admin: validateUserData.admin
    };

    // Tallennetaan käyttäjä tietokantaan
    const userData = await createUser(newUser);
    if (!userData) {
      res.status(500).json({ error: "Could not create user, try again" });
      return;
    }

    // Luodaan JWT-token
    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email
      },
      config.JWT_KEY,
      {
        expiresIn: '1h'
      }
    );
    
    // Palautetaan luodun käyttäjän tiedot sekä token
    res.status(201).json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      admin: userData.admin,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user, try again" });
    return;
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let validatedUserData;
  try {
    // Validoidaan login-data
    validatedUserData = userLoginSchema.parse(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Invalid input, zod error' });
      return;
    }
    res.status(500).json({ error: "Could not log in, try again" });
    return;
  }


  try {
    // Etsitään käyttäjä tietokannasta
    const user = await findUserByEmail(validatedUserData.email);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Tarkistetaan salasanan oikeellisuus
    const validPassword = await bcrypt.compare(validatedUserData.password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Luodaan JWT-token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      config.JWT_KEY,
      {
        expiresIn: '1h'
      }
    )

    // Palautetaan käyttäjän ID, nimi ja token
    res.status(200).json({
      id: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not log in, try again" });
    return;
  }
}