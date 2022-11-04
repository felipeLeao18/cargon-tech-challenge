import { error } from '../../lib/errorBuilder'
import prismaClient from '../database/client'
import { IUser } from '../types/IUser'

const create = async ({ name, email, password }: IUser): Promise<IUser> => {
  if (!email) {
    throw error.build({ statusCode: 422, message: 'Email not provided' })
  }

  if (await prismaClient.user.findFirst({ where: { email } })) {
    throw error.build({ statusCode: 412, message: 'Email already taken' })
  }

  // const user = await prismaClient.user.create({
  //   data: {
  //     name,
  //     email,
  //     password: hashPassword
  //   }
  // })

  const user: IUser = {
    name,
    email,
    password
  }
  return user
}
export const userService = {
  create
}
