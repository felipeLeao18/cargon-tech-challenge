import { validator } from './validator'

describe('unit: validate email', () => {
  it('should fail with empty args', async () => {
    const invalidEmail = ''
    const isValid = validator.validateEmail(invalidEmail)
    expect(isValid).toBe(false)
  })
  it('should fail with invalid (no@)', async () => {
    const invalidEmail = 'mail.com'
    const isValid = validator.validateEmail(invalidEmail)
    expect(isValid).toBe(false)
  })
  it('should fail when email has nothing before the @', async () => {
    const invalidEmail = '@mail.com'

    const isValid = validator.validateEmail(invalidEmail)
    expect(isValid).toBe(false)
  })
  it('should fail when email has nothing after the @', async () => {
    const invalidEmail = 'mail@'

    const isValid = validator.validateEmail(invalidEmail)
    expect(isValid).toBe(false)
  })
  it('should fail when email has nothing after the @provider', async () => {
    const invalidEmail = 'mail@provider'

    const isValid = validator.validateEmail(invalidEmail)
    expect(isValid).toBe(false)
  })
  it('should pass when email is valid', async () => {
    const invalidEmail = 'mail@provider.com'

    const isValid = validator.validateEmail(invalidEmail)
    expect(isValid).toBe(true)
  })
})
