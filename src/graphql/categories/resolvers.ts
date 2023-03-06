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
  { input }: { input: CategoryInput }
): Promise<Partial<CategoryDocument>> => {
  const { title, description } = input
  const id = uuidv4()
  const slug = title.toLowerCase().split(' ').join('-')
  const category = await client.create<CategoryDocument>({
    id,
    index: CATEGORY_INDEX,
    refresh: true,
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

const getCategoryBySlug = async (
  _: any,
  { slug }: { slug: string }
): Promise<Partial<CategoryDocument> | undefined> => {
  const results = await client.search<CategoryDocument>({
    index: CATEGORY_INDEX,
    query: {
      term: {
        'slug.keyword': slug,
      },
    },
  })

  if (!(results.hits.total as SearchTotalHits).value) {
    throw new GraphQLError('Not found the category', {
      extensions: {
        code: ServerErrorCode.BAD_REQUEST,
        http: {
          status: 400,
        },
      },
    })
  }

  // should always return one document
  return results.hits.hits[0]._source
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
    refresh: true,
    id,
  })

  return {
    id: deleteResults._id,
  }
}

const updateCategory = async (
  _: any,
  { id, input }: { id: string; input: CategoryInput }
): Promise<Partial<CategoryDocument> | undefined> => {
  const results = await client.update<CategoryDocument>({
    index: CATEGORY_INDEX,
    refresh: true,
    id,
    doc: {
      ...input,
      slug: input.title.toLowerCase().split(' ').join('-'),
    },
  })

  const getResults = await client.get<CategoryDocument>({
    index: CATEGORY_INDEX,
    id: results._id,
  })

  return getResults._source
}

const mutations = {
  createCategory: authenticated(authorized(ROLE.ADMIN)(createCategory)),
  deleteCategory: authenticated(authorized(ROLE.ADMIN)(deleteCategory)),
  updateCategory: authenticated(authorized(ROLE.ADMIN)(updateCategory)),
}

const queries = {
  getCategories,
  getCategoryBySlug,
}

export const resolvers = {
  mutations,
  queries,
}
