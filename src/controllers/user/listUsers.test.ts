import request from 'supertest'
import { app } from '../../app'
import prismaClient from '../../database/client'

describe('integration: list users', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })
  afterEach(async () => {
    await prismaClient.user.deleteMany()
  })

  afterAll(async () => {
    await prismaClient.user.deleteMany()
    await prismaClient.$disconnect()
  })

  it('should return 200 and list users', async () => {
    const TOTAL_DOCS = 12
    for (let index = 0; index < TOTAL_DOCS; index++) {
      await prismaClient.user.create({
        data: {
          name: `${index} name`,
          email: `${index}valid@gmail.com`,
          password: '12345'
        }
      })
    }
    const query = {
      page: 1,
      perPage: 10
    }
    const response = await request(app).get('/users').query(query)
    expect(response.statusCode).toBe(200)

    const { data, totalSize } = response.body
    expect(data.length).toBe(query.perPage)
    expect(data.every(d => d.password)).toBeFalsy()
    expect(data.every(d => d.id)).toBeTruthy()
    expect(data.every(d => d.name)).toBeTruthy()
    expect(data.every(d => d.email)).toBeTruthy()

    expect(totalSize).toBe(TOTAL_DOCS)
  })
  it('should return 200 and list users querying by name', async () => {
    const INVALID_DOCS = 3
    for (let index = 0; index < INVALID_DOCS; index++) {
      await prismaClient.user.create({
        data: {
          name: `${index} name`,
          email: `${index}valid@gmail.com`,
          password: '12345'
        }
      })
    }

    const VALID_DOCS = 2
    const createValidDocs = async () => {
      for (let index = 0; index < VALID_DOCS; index++) {
        await prismaClient.user.create({
          data: {
            name: `${index} teste`,
            email: `${index}valid@gmail.com`,
            password: '12345'
          }
        })
      }
    }
    await createValidDocs()
    const query = {
      page: 1,
      perPage: 10,
      name: 'tes'
    }
    const response = await request(app).get('/users').query(query)
    expect(response.statusCode).toBe(200)

    const { data, totalSize } = response.body
    expect(data.length).toBe(VALID_DOCS)
    expect(data.every(d => d.password)).toBeFalsy()
    expect(data.every(d => d.id)).toBeTruthy()
    expect(data.every(d => d.name)).toBeTruthy()
    expect(data.every(d => d.email)).toBeTruthy()

    expect(totalSize).toBe(VALID_DOCS)
  })
})
