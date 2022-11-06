import { Request, Response } from 'express'
import { userService } from '../../services/userService'

/**
*  @openapi
*  /users:
*  get:
*    summary: List users
*    tags: [User]
*    consumes:
*      - application/json
*    parameters:
*      - in: query
*        name: name
*        description: substring that will match documents which name includes the substring provided
*        example: 'felipe'
*        required: false
*        type: string
*      - in: query
*        name: page
*        description: page number
*        example: 1
*        required: false
*        type: number
*      - in: query
*        name: perPage
*        description: set how many results per page will be provided
*        example: 10
*        required: false
*        type: number
*    responses:
*      200:
*        description: 'Users list'
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                 type: object
*                 properties:
*                   id:
*                     type: string
*                   name:
*                     type: string
*                   email:
*                     type: string
*                   created_at:
*                     type: string
*                     format: date-time
*/

export const listUsers = async (req: Request, res: Response) => {
  const { page, perPage, name } = req.query
  const response = await userService.list({
    page: page ? parseInt(page as string) : 1,
    perPage: perPage ? parseInt(perPage as string) : 10,
    name: name as string ?? ''
  })
  return res.status(200).json(response)
}
