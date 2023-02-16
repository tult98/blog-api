import { ArticleInput } from './../../models/article'
const createArticle = (_: any, args: ArticleInput) => {
  const { title, preface, body, category, tags } = args
  console.log('================', title, preface, body, category, tags)
  // TODO: validate input 

  // TODO: create article & storage in elasticsearch
}

const queries = {}

const mutations = {
  createArticle,
}

export const resolvers = { queries, mutations }
