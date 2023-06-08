import express, { Application } from 'express'
import cors from 'cors'

import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandelar from './app/middlewares/globalErrorHandeler'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users', UserRoutes)

//initially connect
// app.get('/', (req: Request, res: Response/* , next: NextFunction */) => {
//   throw new ApiError(400, "this is api error");
//   //throw new Error("this is api error");
//   //next('this is error');
//   //res.send('Working Successfully')
// })

//global error handler
app.use(globalErrorHandelar)

export default app
