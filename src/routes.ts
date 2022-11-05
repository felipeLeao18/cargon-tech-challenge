/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createUser } from './controllers/user/createUser'
import { listUsers } from './controllers/user/listUsers'

const router = Router()

router.post('/users', createUser)
router.get('/users', listUsers)

export { router }
