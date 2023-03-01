'use strict'
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        email: 'admin@example.com',
        password: await hashedPassword('Admin1234'),
        first_name: 'Tu',
        last_name: 'Le',
        full_name: 'admin',
        role: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        email: 'user@example.com',
        password: await hashedPassword('User1234'),
        first_name: 'Tu',
        last_name: 'Le',
        full_name: 'user',
        role: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
