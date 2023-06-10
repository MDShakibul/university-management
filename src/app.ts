import express, {
  Application /* , NextFunction, Request, Response */,
} from 'express';
import cors from 'cors';

import globalErrorHandelar from './app/middlewares/globalErrorHandeler';
import routers from './app/routes';

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

export default app;
