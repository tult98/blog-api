export interface ArticleInput {
  title: string
  preface: string
  body: string
  thumbnail: string
  category: string
  tags: string[]
}

export interface ArticleDocumentInput extends ArticleInput {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface ArticleDocument {
  _id?: string
  title?: string
  slug?: string
  thumbnail?: string
  preface?: string
  body?: string
  category?: string
  tags?: string[]
  createdAt?: Date
  updatedAt?: Date
}
