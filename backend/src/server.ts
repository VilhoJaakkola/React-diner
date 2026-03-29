import app from './app.js';
import { config } from './config/config.js';

try {
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
  await app.listen({ port: config.APP_PORT, host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}