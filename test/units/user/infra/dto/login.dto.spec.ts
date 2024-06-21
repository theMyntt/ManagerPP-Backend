import { validate } from 'class-validator'
import { LoginUserDTO } from '@src/user/infra/dto/login.dto'

describe('LoginUserDTO', () => {
  it('should succeed with valid data', async () => {
    const dto = new LoginUserDTO()
    dto.access_code = 'validAccessCode'
    dto.password = 'validPassword'

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should fail if access_code is empty', async () => {
    const dto = new LoginUserDTO()
    dto.access_code = ''
    dto.password = 'validPassword'

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].property).toBe('access_code')
  })

  it('should fail if password is empty', async () => {
    const dto = new LoginUserDTO()
    dto.access_code = 'validAccessCode'
    dto.password = ''

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].property).toBe('password')
  })

  it('should fail if access_code is not a string', async () => {
    const dto = new LoginUserDTO()
    // @ts-ignore: Suppress TypeScript error for test purpose
    dto.access_code = 12345
    dto.password = 'validPassword'

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].property).toBe('access_code')
  })

  it('should fail if password is not a string', async () => {
    const dto = new LoginUserDTO()
    dto.access_code = 'validAccessCode'
    // @ts-ignore: Suppress TypeScript error for test purpose
    dto.password = 12345

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].property).toBe('password')
  })
})
