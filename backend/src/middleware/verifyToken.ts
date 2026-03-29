import { FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config.js';

export async function verifyToken(req: FastifyRequest, reply: FastifyReply) {
  if (req.method === 'OPTIONS') return;

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ message: 'Authentication failed: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return reply.status(401).send({ message: 'Authentication failed: invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_KEY) as JwtPayload;
    if (!decoded?.id) {
      return reply.status(401).send({ message: 'Authentication failed: invalid token payload' });
    }
  } catch {
    return reply.status(401).send({ message: 'Authentication failed' });
  }
}
