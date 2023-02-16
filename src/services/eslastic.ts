import { Client } from '@elastic/elasticsearch'

const ELASTIC_URL = process.env.ELASTIC_URL ?? 'http://localhost:9200'

export const client = new Client({
  node: ELASTIC_URL,
})

export const checkConnection = async () => {
  console.log('❓  Checking connection to Elasticsearch...')
  try {
    await client.cluster.health({})
    console.log('✅  Connect to Elasticsearch successful.')
  } catch (error) {
    console.log('⚠️   Cannot connect to Elasticsearch.')
    console.log(error)
  }
}
