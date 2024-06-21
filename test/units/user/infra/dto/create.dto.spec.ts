import { CreateUserDTO } from '@src/user/infra/dto/create.dto'
import { faker } from '@faker-js/faker'

describe('CreateUserDTO', () => {
  let createUserDTO: CreateUserDTO

  beforeAll(() => {
    createUserDTO = new CreateUserDTO()
  })

  describe('Entity errors', () => {
    it('should throw error when name is empty', () => {
      createUserDTO.name = ''
      createUserDTO.email = faker.internet.email()
      createUserDTO.password = faker.internet.password()

      const response = createUserDTO.validate()[0]

      expect(response).toEqual({
        children: [],
        constraints: { isNotEmpty: 'name should not be empty' },
        property: 'name',
        target: {
          email: createUserDTO.email,
          name: '',
          password: createUserDTO.password
        },
        value: ''
      })
    })

    // it('should throw error when email is empty', () => {
    //   createUserDTO.email = ''

    //   expect(() => createUserDTO.validate()).toThrow(InvalidInformations)
    // })

    // it('should throw error when password is empty', () => {
    //   createUserDTO.password = ''

    //   expect(() => createUserDTO.validate()).toThrow(InvalidInformations)
    // })

    // it('should throw error when email is invalid', () => {
    //   createUserDTO.email = 'john.doe'

    //   expect(() => createUserDTO.validate()).toThrow(InvalidInformations)
    // })
  })
})
