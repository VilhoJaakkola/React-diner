import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import foodRoutes from './routes/foods.route';
import userRoutes from './routes/users.route';

dotenv.config();

const app: Application = express();

// app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://172.16.6.134'
  ]
}));
app.use(express.static('public')) 

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();  
});


app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response):void => {
  res.send('API is running...');
});

export default app;