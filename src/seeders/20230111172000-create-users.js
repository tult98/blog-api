'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        email: 'admin@example.com',
        password: 'Admin1234', // the password need to be hashed in future
        first_name: 'Tu',
        last_name: 'Le',
        full_name: 'admin',
        role: 2,
      },
      {
        id: uuidv4(),
        email: 'user@example.com',
        password: 'User1234',
        first_name: 'Tu',
        last_name: 'Le',
        full_name: 'user',
        role: 1,
      },
    ])
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  },
}
