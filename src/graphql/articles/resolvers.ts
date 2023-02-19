import { v4 as uuidv4 } from 'uuid'
import { client } from '../../services/eslastic'
import {
  ArticleDocument,
  ArticleDocumentInput,
  ArticleInput,
} from './../../models/article'

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

const queries = {}

const mutations = {
  createArticle,
}

export const resolvers = { queries, mutations }
