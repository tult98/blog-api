'use strict'

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: process.env.ELASTIC_URL ?? 'http://localhost:9200',
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await client.indices.create({
      index: 'articles',
      mappings: {
        properties: {
          title: { type: 'text' },
          slug: { type: 'text' },
          preface: { type: 'text' },
          thumbnail: { type: 'text' },
          // NOTE: there are tags field where its value should be an array of string
          body: { type: 'text' },
          category: { type: 'keyword' },
          createdAt: { type: 'date' },
          updatedAt: { type: 'date' },
        },
      },
    })
  },

  async down() {
    await client.indices.delete({ index: 'articles' })
  },
}
