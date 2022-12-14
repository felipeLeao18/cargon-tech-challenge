import { error } from '../../lib/errorBuilder'
import prismaClient from '../database/client'
import { IUser } from '../types/IUser'
import { crypt } from './common/cryptService'
import { validator } from './common/validator'
import zod from 'zod'

const createUser = zod.object({
  name: zod.string().min(1, 'name is required'),
  email: zod.string().min(1, { message: 'email is required' }),
  password: zod.string().min(5, 'password must have at least 5 characters')
})

const create = async ({ name, email, password }: Omit<IUser, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: true }> => {
  createUser.parse({ name, email, password })

  if (!email) {
    throw error.build({ statusCode: 422, message: 'Email not provided' })
  }

  const validEmail: boolean = validator.validateEmail(email)
  if (!validEmail) {
    throw error.build({ statusCode: 422, message: 'Invalid email provided' })
  }

  if (await prismaClient.user.findFirst({ where: { email } })) {
    throw error.build({ statusCode: 412, message: 'Email already taken' })
  }

  const hashPassword = crypt.createHash(password)
  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashPassword
    }
  })

  if (!user) {
    throw new Error('Internal server error')
  }

  return { success: true }
}

const list = async ({ page = 1, perPage = 10, name = '' }): Promise<{ data: Array<Omit<IUser, 'password' | 'updated_at'>>, totalSize: Number } > => {
  if (typeof page !== 'number' || typeof perPage !== 'number') {
    page = 1
    perPage = 10
  }

  const filter = name ? { name: { contains: name } } : {}
  const users = await prismaClient.user.findMany({
    skip: page > 0 ? (page - 1) * perPage : perPage,
    take: perPage,
    where: filter,
    select: {
      name: true,
      email: true,
      id: true,
      created_at: true
    }
  })
  const totalSize = await prismaClient.user.count({ where: filter })
  return { data: users, totalSize }
}

export const userService = {
  create,
  list
}
