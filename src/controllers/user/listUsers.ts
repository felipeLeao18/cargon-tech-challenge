import { Request, Response } from 'express'
import { userService } from '../../services/userService'

export const listUsers = async (req: Request, res: Response) => {
  const { page, perPage, name } = req.query
  const response = await userService.list({
    page: page ? parseInt(page as string) : 1,
    perPage: perPage ? parseInt(perPage as string) : 10,
    name: name as string ?? ''
  })
  return res.status(200).json(response)
}
