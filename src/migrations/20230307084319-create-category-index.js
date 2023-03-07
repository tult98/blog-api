'use strict'

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: process.env.ELASTIC_URL ?? 'http://localhost:9200',
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await client.indices.create({
      index: 'categories',
      mappings: {
        properties: {
          id: { type: 'keyword' },
          title: { type: 'text' },
          slug: { type: 'keyword' },
          description: { type: 'text' },
          createdAt: { type: 'date' },
          updatedAt: { type: 'date' },
        },
      },
    })
  },

  async down() {
    await client.indices.delete({ index: 'categories' })
  },
}
