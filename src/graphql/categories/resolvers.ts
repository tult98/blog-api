import { ROLE } from '../../models/user'
import { authenticated, authorized } from '../../utils/graphql'
import {
  CategoryInput,
  CategoryDocumentInput,
  CategoryDocument,
} from './../../models/category'
import { v4 as uuidv4 } from 'uuid'
import { client } from '../../services/eslastic'

const CATEGORY_INDEX = 'categories'

const createCategory = async (
  _: any,
  args: CategoryInput
): Promise<CategoryDocument> => {
  const { title, description } = args
  const id = uuidv4()
  const slug = title.split(' ').join('-')
  const category = await client.create<CategoryDocumentInput>({
    id,
    index: CATEGORY_INDEX,
    document: {
      id,
      title,
      slug,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  const categoryDocument = await client.get<CategoryDocument>({
    index: CATEGORY_INDEX,
    id: category._id,
  })

  return {
    ...categoryDocument._source,
  }
}

const getCategories = async () => {
  const results = await client.search<CategoryDocument>({
    index: CATEGORY_INDEX,
  })

  const categories = results.hits.hits.map((document) => document._source)
  return {
    categories,
    // @ts-expect-error
    meta: { total: results.hits.total.value },
  }
}

const mutations = {
  createCategory: authenticated(authorized(ROLE.ADMIN)(createCategory)),
}

const queries = {
  getCategories,
}

export const resolvers = {
  mutations,
  queries,
}
