export interface ArticleInput {
  title: string
  preface: string
  body: string
  thumbnail: string
  category: string
  tags: string[]
}

export interface UpdateArticleInput extends ArticleInput {
  id: string
}

export interface ArticleDocument extends ArticleInput {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
}
