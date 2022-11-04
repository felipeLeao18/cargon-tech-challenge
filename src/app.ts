import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.use((err: { err: Error, statusCode: number, message: string }, _req: Request, res: Response, _next: NextFunction) => {
  if (err.err && err.err instanceof Error) {
    return res.status(err.statusCode).json({
      message: err.message,
      status: 'error'
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

export { app }
