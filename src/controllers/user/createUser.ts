import { Request, Response } from 'express'
import { userService } from '../../services/userService'

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const response = await userService.create({ name, email, password })
  return res.status(201).json(response)
}
