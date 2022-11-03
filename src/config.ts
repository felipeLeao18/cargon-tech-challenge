import dotenv from 'dotenv'
dotenv.config()

export const config = {
  LOCAL_PORT: process.env.LOCAL_PORT ?? 3000
}
