export interface CategoryInput {
  title: string
  description: string
}

export interface CategoryDocumentInput extends CategoryInput {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryDocument {
  id?: string
  title?: string
  slug?: string
  description?: string
  createdAt?: Date
  updatedAt?: String
}
