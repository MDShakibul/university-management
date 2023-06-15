import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandelar from './app/middlewares/globalErrorHandeler';
import routers from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/', routers);

//initially connect
// app.get('/', (req: Request, res: Response , next: NextFunction) => {
//   throw new Error("You have an error");
// })

//global error handler
app.use(globalErrorHandelar);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messgae: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
