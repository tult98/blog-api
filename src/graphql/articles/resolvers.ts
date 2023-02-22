import { v4 as uuidv4 } from 'uuid'
import { ROLE } from '../../models/user'
import { authenticated, authorized } from '../../utils/graphql'
import {
  ArticleDocument,
  ArticleDocumentInput,
  ArticleInput,
  UpdateArticleInput,
} from './../../models/article'
import { client } from './../../services/eslastic'

const ARTICLE_INDEX = 'articles'

const createArticle = async (
  _: any,
  args: ArticleInput
): Promise<ArticleDocument> => {
  const { title, thumbnail, preface, body, category, tags } = args
  const slug = title.split(' ').join('-')
  const id = uuidv4()
  const article = await client.create<ArticleDocumentInput>({
    id,
    index: ARTICLE_INDEX,
    document: {
      id,
      title,
      slug,
      thumbnail,
      preface,
      body,
      category,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  const articleDocument = await client.get<ArticleDocument>({
    index: ARTICLE_INDEX,
    id: article._id,
  })

  return {
    ...articleDocument._source,
  }
}

const updateArticle = async (
  _: any,
  args: UpdateArticleInput
): Promise<ArticleDocument> => {
  const { id, ...rest } = args
  const results = await client.update<ArticleDocument>({
    index: ARTICLE_INDEX,
    id,
    doc: {
      ...rest,
      updatedAt: new Date(),
    },
  })

  const updatedArticle = await client.get<ArticleDocument>({
    index: ARTICLE_INDEX,
    id: results._id,
  })

  return {
    ...updatedArticle._source,
  }
}

const getArticles = async () => {
  const results = await client.search<ArticleDocument>({
    index: ARTICLE_INDEX,
  })

  const articles = results.hits.hits.map((document) => document._source)

  return {
    articles,
    // @ts-expect-error
    meta: { total: results?.hits?.total?.value ?? 0 },
  }
}

const queries = {
  getArticles,
}

const mutations = {
  createArticle: authenticated(authorized(ROLE.ADMIN)(createArticle)),
  updateArticle,
}

export const resolvers = { queries, mutations }
