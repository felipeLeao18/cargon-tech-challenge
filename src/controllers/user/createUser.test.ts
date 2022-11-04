import request from 'supertest'
import { app } from '../../app'

describe('integration: Create user', () => {
  it('should return 422 when email is not provided', async () => {
    const response = await request(app).post('/users').send({
      name: 'valid_name',
      password: 'valid_password'
    })

    console.log(response.body)
    expect(response.statusCode).toBe(422)

    const error = response.body
    expect(error.status).toBe('error')
    expect(error.message).toBe('Email not provided')
  })
})
