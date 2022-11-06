export const docsConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CargOn tech challenge documentation',
      version: '0.1.0',
      description:
        'This is the documentation to the cargOn tech challenge. I hope you enjoy it',
      contact: {
        name: 'Felipe Leao',
        url: 'https://www.linkedin.com/in/felipeleao18/',
        email: 'flpleao@discente.ufg.br'
      }
    }

  },
  apis: ['./src/**/*.ts'],
  tags: [
    {
      name: 'User',
      description: 'users entity'
    }
  ]
}
