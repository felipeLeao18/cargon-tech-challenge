/**
 * @swagger
 *  components:
 *  schemas:
 *     User:
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         created_at:
 *           type: Date
 *         updatedAt:
 *           type: Date
 */

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}
