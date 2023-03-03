import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/typesWithBodyKey'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { ROLE } from '../../models/user'
import { client } from '../../services/eslastic'
import { ServerErrorCode } from '../../utils/errors'
import { authenticated, authorized } from '../../utils/graphql'
import { CategoryDocument, CategoryInput } from './../../models/category'

const CATEGORY_INDEX = 'categories'

const createCategory = async (
  _: any,
  args: CategoryInput
): Promise<Partial<CategoryDocument>> => {
  const { title, description } = args
  const id = uuidv4()
  const slug = title.toLowerCase().split(' ').join('-')
  const category = await client.create<CategoryDocument>({
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

  const categories = results.hits.hits.map((document) => {
    return document._source
  })
  return {
    categories,
    meta: { total: (results.hits.total as SearchTotalHits).value },
  }
}

const deleteCategory = async (
  _: any,
  { id }: { id: string }
): Promise<{ id: string }> => {
  const searchResults = await client.search<CategoryDocument>({
    index: CATEGORY_INDEX,
    query: {
      match: {
        _id: id,
      },
    },
  })

  if (!(searchResults.hits.total as SearchTotalHits).value) {
    throw new GraphQLError('Not found the category', {
      extensions: {
        code: ServerErrorCode.BAD_REQUEST,
        http: {
          status: 400,
        },
      },
    })
  }

  const deleteResults = await client.delete({
    index: CATEGORY_INDEX,
    id,
  })

  return {
    id: deleteResults._id,
  }
}

const mutations = {
  createCategory: authenticated(authorized(ROLE.ADMIN)(createCategory)),
  deleteCategory: authenticated(authorized(ROLE.ADMIN)(deleteCategory)),
}

const queries = {
  getCategories,
}

export const resolvers = {
  mutations,
  queries,
}
